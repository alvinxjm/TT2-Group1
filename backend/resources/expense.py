from datetime import datetime
from flask_restful import Resource, reqparse
from models.expense import ExpenseModel
import json
import hashlib

class ExpenseByProjectID(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('project_id',type=int,required=True,help="This field cannot be blank.")
    parser.add_argument('category_id',type=int,required=False,help="This field cannot be blank.")
    parser.add_argument('name',type=str,required=True,help="This field cannot be blank.")
    parser.add_argument('description',type=str,required=False,help="This field cannot be blank.")
    parser.add_argument('amount',type=float,required=True,help="This field cannot be blank.")
    parser.add_argument('created_at',type=datetime,required=False,help="This field cannot be blank.")
    parser.add_argument('created_by',type=str,required=False,help="This field cannot be blank.")
    parser.add_argument('updated_at',type=datetime,required=False,help="This field cannot be blank.")
    parser.add_argument('updated_by',type=str,required=False,help="This field cannot be blank.")

    def get(self, project_id):
        expenses = ExpenseModel.find_by_project_id(project_id)
        if expenses:
            return [expense.json() for expense in expenses]
        return {'message': 'No expenses found for this project'}, 200

class Expense(Resource):
    def post(self):
        data = ExpenseByProjectID.parser.parse_args()
        data['category_id'] = 2
        data['description'] = 'Server maintenance and upgrading work to incorporate BC plans'
        expense = ExpenseModel(data['project_id'], data['category_id'], data['name'], data['description'], data['amount'], data['created_at'], data['created_by'], data['updated_at'], data['updated_by'])
        expense.save_to_db()
        
        return {'message': 'Expense successfully updated'}, 201

    def put(self, expense):
        expense = ExpenseModel.find_by_expense_id(expense.expense_id)
        if expense:
            return {'message': 'Expense not found'}, 404
        ExpenseModel.updateExpense(expense)
        return {'message': 'Expense successfully updated'}, 200

class ExpensesByExpenseID(Resource):
    def delete(self, expense_id):
        expense = ExpenseModel.find_by_expense_id(expense_id)
        if expense:
            return {'message': 'Expense not found'}, 404
        ExpenseModel.deleteExpense(expense)
        return {'message': 'Expense successfully deleted'}, 200


