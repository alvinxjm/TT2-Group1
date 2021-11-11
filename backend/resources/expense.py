from datetime import datetime
from flask_restful import Resource, reqparse
from models.expense import ExpenseModel
from flask import request
from datetime import datetime
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
        
        return {'message': 'Expense successfully created'}, 201

    def put(self):
        data = request.get_json()
        expense_id = data.get('expense_id')
        project_id = data.get('project_id')
        category_id = data.get('category_id')
        name = data.get('name')
        description = data.get('description')
        amount = data.get('amount')
        updated_by = data.get('updated_by')
        for compulsory in [expense_id, project_id, category_id, name, description, amount, updated_by]:
            if compulsory == None:
                return {'message': f"Missing field."}
        # if expense_id == None or project_id == None or category_id == None or name == None or description == None or amount == None or updated_by == None:
        #     return {'message': ''}
        expense = ExpenseModel.find_by_expense_id(expense_id)
        try:
            if expense:
                expense.project_id = project_id
                expense.category_id = category_id
                expense.name=name
                expense.description = description
                expense.amount = amount
                expense.updated_at = datetime.now()
                expense.updated_by = updated_by
                expense.save_to_db()
            else:
                return {'message': 'Expense not found'}, 404
        except Exception as e:
            return {'message': str(e)}
        return {'message': 'Expense successfully updated'}, 200

class ExpensesByExpenseID(Resource):
    def delete(self, expense_id):
        expense = ExpenseModel.find_by_expense_id(expense_id)
        if expense:
            return {'message': 'Expense not found'}, 404
        ExpenseModel.deleteExpense(expense)
        return {'message': 'Expense successfully deleted'}, 200


