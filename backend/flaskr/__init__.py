#from crypt import methods
import os
from unicodedata import category
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
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

            # try:
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

            # except:
            #     abort(422)

        else:
            abort(405)




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

