#from crypt import methods
import os
from unicodedata import category
from flask import Flask, request, redirect, abort, jsonify, session, make_response, Response
from flask_session import Session
# from sqlalchemy.orm import scoped_session, sessionmaker
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS, cross_origin
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import func
import random
from models import setup_db, User, Expense, Category,UserCategory, Income, db, get_categories
from auth import login_required, AuthError
from flask_mail import Mail, Message
import random
import string
from datetime import datetime, timedelta
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    mail = Mail(app)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    

    # This is the configuration for the authentication with Flask Session.
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_USE_SIGNER"] = True
    app.config['PERMANENT_SESSION_LIFETIME'] = 3600 # 30 minutes
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE'] = True
    Session(app)

    # This is the configuration for the email server.
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True
    app.config['MAIL_DEFAULT_SENDER'] = 'noreply@expense.com'
    mail = Mail(app)

    with app.app_context():
        setup_db(app)

    s = URLSafeTimedSerializer('SECRET_KEY')    
    
    # cors = CORS(app ,supports_credentials=True, origins=['*'])
    cors = CORS(app, supports_credentials=True)


    # CORS Headers
    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type, Authorization, true"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE"
        )
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        return response


    @app.route('/')
    def index():
        if "user_id" in session:
            return jsonify({
                "Logged in": 'Logged in as ' + session['email'],
            })
        print(session) 
        return 'You are not logged in'      
    

    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            body = request.get_json()

            new_username = body.get("name")
            new_email = body.get("email").lower()
            new_password = body.get("password")

            try:
                user = User(username=new_username, email=new_email, password=new_password)
                user.insert()

                categories = list(range(1, 12))
                for category_id in categories:
                    user_category = UserCategory(category_id=category_id, user_id=user.id)
                    user_category.insert()

                session["user_id"] = user.id
                session["email"] = user.email
                
                return jsonify(
                    {
                        "success": True,
                        'message': 'Account created'
                    }
                )

            except IntegrityError as e:
                print("An integrity error occurred:", e)
                return jsonify({'error': 'User already exixts'}), 400

            except:
                abort(422)
        else:
            abort(405)
    
    @cross_origin
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            body = request.get_json()
            email = body.get("email").lower()
            password = body.get("password")

            try:
                selection = User.query.filter_by(email = email).first()
                if selection is None:
                    # return "User does not exist"
                    return jsonify({'error': 'Invalid email or password'}), 400

                if selection.check_password(password):
                    session["user_id"] = selection.id
                    session["email"] = selection.email
                    
                else:
                    return jsonify({'error': 'Invalid email or password'}), 400
                    # abort(401)

                return jsonify(
                        {
                            "success": True,
                            'message': 'Login successful'
                        }
                    )
            

            except:
                abort(422)

        else:
            abort(405)

    @app.route('/logout')
    def logout():
        session.clear()
        return jsonify(
                    {
                        "success": True,
                        'message': 'Logout successful',
                    }
                ), 200
        

    @app.route('/forgot_password', methods=['POST'])
    def forgot_password():
        email = request.json.get('email')
        user = User.query.filter(User.email == email).one_or_none()
        if user:
            # Generate token
            token = s.dumps(email, salt='reset_password')
            
            # Create message with token and send email
            msg = Message('Password Reset Request', sender='noreply@expense.com', recipients=[email])
            msg.body = f"Hi,\n\nPlease use the following link to reset your password:\n\nhttp://localhost:3000/Token?token={token}\n\nLink expires in 10 minutes. If you did not make this request then simply ignore this email and no changes will be made."
            mail.send(msg)
            
            return jsonify(
                {
                    "success": True,
                    'message': 'Password reset link has been sent to your email.'
                }
            ),200
        else:
            return jsonify({'error': 'User with provided email does not exist'}), 404


    @app.route('/reset_password', methods=['POST'])
    def reset_password():
        new_password = request.json.get('password')
        token = request.json.get('token')
        # confirm_password = request.json.get('confirm_password')

        try:
            # Verify token
            email = s.loads(token, salt='reset_password', max_age=600) # Expires in 10 minutes
        except SignatureExpired:
            # If token is expired, return error response
            return jsonify({'error': 'Password reset link has expired.'}), 400
        except BadSignature:
            # If token is invalid, return error response
            return jsonify({'error': 'Invalid password reset link.'}), 400

        user = User.query.filter(User.email == email).one_or_none()
        if user is None:
            abort(404)
        user.password = generate_password_hash(new_password)
        user.update()
        
        return jsonify(
            {
                "success": True,
                'message': 'Password has been reset successfully.'
            }
        ),200



    @app.route('/user', methods=['GET','PATCH','DELETE'])
    @login_required
    def user_profile():
        if request.method == 'PATCH':
            body = request.get_json()
            
            try:
                user = User.query.filter(User.id == session['user_id']).one_or_none()
                if user is None:
                    abort(404)

                if 'username' in body:
                    user.username = body.get('username')

                if 'password' in body:
                    user.password = generate_password_hash(body.get('password'))

                user.update()

                updatedUser = User.query.filter(User.id == session['user_id']).first()

                return jsonify(
                    {
                        "success": True,
                        "user": updatedUser.format()
                    }
                )

            except:
                abort(404)

        elif request.method == 'GET':
            try:
                user = User.query.filter(User.id == session['user_id']).one_or_none()
                if user is None:
                    abort(404)
                return {
                    "success": True,
                    'user': user.format()
                    }
            except:
                abort(405)
        
        elif request.method == 'DELETE':
            try:
                user = User.query.filter(User.id == session['user_id']).one_or_none()
                if user is None:
                    abort(404)
                user.delete()
                session.clear()
                return jsonify(
                    {
                        "success": True
                    }
                )
            except:
                abort(422)

        else:
            abort(405)
    
    @app.route('/expenses', methods=['GET', 'POST'])
    @login_required
    def expenses():
        if request.method == 'POST':
            body = request.get_json()
            # print(body)

            category = body.get("category")
            name = body.get("name")
            amount = body.get("amount")

            try:
                category_id = Category.query.filter(Category.type == category).first().id
                expense = Expense(user_id=session['user_id'], category_id=category_id, name=name, amount=amount)
                expense.insert()

                return jsonify(
                    {
                        "success": True,
                        "created": expense.format()
                    }
                )

            except:
                abort(422)
        else:
            try:
                expenses = Expense.query.filter(Expense.user_id == session['user_id']).order_by(Expense.category_id).all()
                expenses_list = [expense.format() for expense in expenses]
                
                return jsonify(
                    {
                        "success": True,
                        "expenses": expenses_list
                    }
                )
            except:
                abort(405)


    @app.route('/expenses/<int:id>', methods=['PATCH'])
    @login_required
    def update_expense(id):
        body = request.get_json()
        
        try:
            expense = Expense.query.filter(Expense.id == id and Expense.user_id == session['user_id']).one_or_none()
            if expense is None:
                abort(404)

            if 'category' in body:
                category = body.get('category')
                expense.category_id = Category.query.filter(Category.type == category).first().id

            if 'name' in body:
                expense.name = body.get('name')
            
            if 'amount' in body:
                expense.amount = body.get('amount')

            expense.update()

            updatedExpense = Expense.query.filter(Expense.id == id).first()

            return jsonify(
                {
                    "success": True,
                    "expense": updatedExpense.format()
                }
            )

        except:
            abort(404)

    @app.route("/expenses/<int:id>", methods=["DELETE"])
    @login_required
    def delete_expense(id):
        try:    
            expense = Expense.query.filter(Expense.id == id and User.id == session['user_id']).one_or_none()

            if expense is None:
                abort(404)

            expense.delete()
            return jsonify(
                {
                    "success": True,
                    "deleted": id,
                }
            )

        except:
            abort(422)

    @app.route('/categories', methods=['GET', 'POST'])
    @login_required
    def categories():
        if request.method == 'POST':
            body = request.get_json()
            type = body.get("type")

            try:
                if Category.query.filter(func.lower(Category.type) == type.lower()).first():
                    return "Category already exists"
                else: 
                    category = Category(type=type)
                    category.insert()
                    user_category = UserCategory(user_id=session['user_id'], category_id=category.id)
                    user_category.insert()

                return jsonify(
                    {
                        "success": True,
                        "created": category.format()
                    }
                )

            except:
                abort(422)
        else:
            try:
                categories = get_categories(session["user_id"])
                categories_list = [category.format() for category in categories]
                
                return jsonify(
                    {
                        "success": True,
                        "categories": categories_list
                    }
                )
            except:
                abort(405)

    @app.route("/categories", methods=["DELETE"])
    @login_required
    def delete_category():
        # try:    
        body = request.get_json()
        type = body.get("type")

        try:
            category = Category.query.filter(func.lower(Category.type) == type.lower()).first()
            if category:
                category.delete()
            else: 
                return "The category you're trying to delete doesn't exist"
        
            return jsonify(
                {
                    "success": True,
                    "deleted": category.id,
                }
            )

        except:
            abort(422)


    @app.errorhandler(400)
    def bad_request(error):
        return (
            jsonify({
                "success": False, 
                "error": 400, 
                "message": "bad request"
            }), 
            400,
        )

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            "success": False,
            "error": 401,
            "message": "Unauthorized request"
        }), 401

    @app.errorhandler(404)
    def not_found(error):
        return (
            jsonify({
                "success": False, 
                "error": 404, 
                "message": "resource not found"
            }),
            404,
        )

    @app.errorhandler(405)
    def method_not_allowed(error):
        return (
            jsonify({
                "success": False, 
                "error": 405, 
                "message": "method not allowed"
            }),
            405,
        )

    @app.errorhandler(422)
    def unprocessable(error):
        return (
            jsonify({
                "success": False, 
                "error": 422, 
                "message": "unprocessable"
            }),
            422,
        )


    @app.errorhandler(500)
    def internal_server_error(error):
        return (
            jsonify({
                "success": False, 
                "error": 500, 
                "message": "Internal server error"
            }),
            500,
        )

    @app.errorhandler(AuthError)
    def handle_exception(e):
        print(e)
        if e.error['code'] == 'unauthorized':
            return (
                jsonify({
                    "success": False, 
                    "code": 'unauthorized',
                    "description": 'User is not logged in'
                }), 401
            )
        

    return app

