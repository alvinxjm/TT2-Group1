from flask import Flask
from flask_restful import Api
from flask_jwt import JWT

# from security import authenticate, identity
from resources.user import UserRegister, Users, UserAuth
from resources.expense import ExpenseByProjectID, Expense
from resources.project import ProjectsByUserID, AllProjects

# from resources.item import Item, ItemList
# from resources.order import Order

from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:password@127.0.0.1:3306/project_expenses"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'
api = Api(app)


app.config["JWT_SECRET_KEY"] = "secret" 
jwt = JWTManager(app)


# @app.before_first_request
# def create_tables():
#     db.create_all()


# jwt = JWT(app, authenticate, identity)  # /auth

# api.add_resource(Order, '/order/<string:name>')
# # api.add_resource(StoreList, '/stores')
# api.add_resource(Item, '/item/<string:name>')
# api.add_resource(ItemList, '/items')
api.add_resource(ExpenseByProjectID,'/expense/<int:project_id')
api.add_resource(Expense,'/expense')
api.add_resource(ProjectsByUserID, '/project/user/<string:user_id>')
api.add_resource(AllProjects, '/project')
api.add_resource(UserRegister, '/register')
api.add_resource(Users, '/user/<string:name>')
api.add_resource(UserAuth, '/user/auth')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
