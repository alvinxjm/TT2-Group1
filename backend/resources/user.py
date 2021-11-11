from flask_restful import Resource, reqparse
from models.user import UserModel
import json
import hashlib


from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "secret" 
jwt = JWTManager(app)


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('appointment',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400
        data['password'] = hashlib.sha256(data['password'].encode()).hexdigest()
        user = UserModel(data['username'], data['password'], data['name'], data['appointment'],)
        user.save_to_db()

        return {"message": "User created successfully."}, 201

class Users(Resource):
    def get(self, name):
        user = UserModel.find_by_username(name)
        if user:
            return user.json()
        return {'message': 'User not found'}, 404

class UserAuth(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    
    def post(self):
        data = UserRegister.parser.parse_args()
        parser = reqparse.RequestParser()
        user = UserModel.find_by_username(data['username'])
        if user is not None:
            hashed = hashlib.sha256(data['password'].encode()).hexdigest()
            if user.password == hashed:
            #if user.password == data['password']:
                access_token = create_access_token(identity='username')
                return {"status": True, "token": access_token}, 200
            else:
                return {"status": False, "message": "Password is wrong"}, 401
        return {"status": False, "message": "User not found"}, 404
