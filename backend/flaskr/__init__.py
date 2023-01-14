#from crypt import methods
import os
from unicodedata import category
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from werkzeug.security import check_password_hash, generate_password_hash
import random

from models import setup_db, User, Expense, Category, Income, db

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    with app.app_context():
        setup_db(app)
    
    cors = CORS(app, resources={r"/api/*" : {"origins": '*'}})
    #CORS(app)

    # CORS Headers
    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE"
        )
        return response

    @app.route('/user', methods=['GET'])
    def getUsers():
        try:
            users = User.query.order_by(User.id).all()
            users_list = [user.format() for user in users]
            
            return jsonify(
                {
                    "success": True,
                    "users": users_list
                }
            )
        except:
            abort(405)


    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            body = request.get_json()
            # print(body)

            new_username = body.get("username")
            new_email = body.get("email")
            new_password = body.get("password")
            # new_password = generate_password_hash(password)

            try:
                user = User(username=new_username, email=new_email, password=new_password)
                user.insert()

                return jsonify(
                    {
                        "success": True,
                        "created": user.format()
                    }
                )

            except:
                abort(422)
        else:
            abort(405)
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            body = request.get_json()
            # print(body)

            email = body.get("email")
            password = body.get("password")

            try:
                selection = User.query.filter_by(email = email).first()
                selection.check_password(password)

                if selection.check_password(password):
                    print("password is correct")
                else:
                    print("Invalid email or password")
                    abort(401)

                return jsonify(
                    {
                        "success": "login Successful",
                        "user": selection.format()
                    }
                )

            except:
                abort(422)

        else:
            abort(405)


    @app.route('/user/<int:id>', methods=['PATCH'])
    # @requires_auth('patch:user')
    def update_profile(id):
        body = request.get_json()
        
        try:
            user = User.query.filter(User.id == id).one_or_none()
            if user is None:
                abort(404)

            if 'username' in body:
                user.username = body.get('username')

            if 'password' in body:
                user.password = generate_password_hash(body.get('password'))

            user.update()

            updatedUser = User.query.filter(User.id == id).first()

            return jsonify(
                {
                    "success": True,
                    "user": updatedUser.format()
                }
            )

        except:
            abort(404)

    
    @app.route('/<int:user_id>/expenses', methods=['GET', 'POST'])
    # @login_required
    def expenses(user_id):
        if request.method == 'POST':
            body = request.get_json()
            # print(body)

            user_id = body.get("user_id")
            category_id = body.get("category_id")
            name = body.get("name")
            amount = body.get("amount")

            try:
                expense = Expense(user_id=user_id, category_id=category_id, name=name, amount=amount)
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
                expenses = Expense.query.filter(Expense.user_id == user_id).order_by(Expense.category_id).all()
                expenses_list = [expense.format() for expense in expenses]
                
                return jsonify(
                    {
                        "success": True,
                        "expenses": expenses_list
                    }
                )
            except:
                abort(405)

    @app.route("/expenses/<int:id>", methods=["DELETE"])
    # @login_required
    def delete_expense(id):
        try:    
            expense = Expense.query.filter(Expense.id == id).one_or_none()

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

    @app.route('/<int:user_id>/categories', methods=['GET', 'POST'])
    # @login_required
    def categories(user_id):
        if request.method == 'POST':
            body = request.get_json()
            # print(body)

            user_id = body.get("user_id")
            name = body.get("name")

            try:
                category = Category(user_id=user_id, name=name)
                category.insert()

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
                categories = Category.query.filter(Category.user_id == user_id).order_by(Category.id).all()
                categories_list = [category.format() for category in categories]
                
                return jsonify(
                    {
                        "success": True,
                        "categories": categories_list
                    }
                )
            except:
                abort(405)

    @app.route('/<int:user_id>/expense/<int:id>', methods=['PATCH'])
    # @requires_auth('patch:expense')
    def update_expense(user_id, id):
        body = request.get_json()
        
        try:
            expense = Expense.query.filter(Expense.id == id and Expense.user_id == user_id).one_or_none()
            if expense is None:
                abort(404)

            if 'category_id' in body:
                expense.category_id = body.get('category_id')

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


    return app

