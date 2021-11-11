from flask_restful import Resource, reqparse
from models.expense import ExpenseModel
import json
import hashlib

class ExpenseByProjectID(Resource):
    def get(self, project_id):
        expenses = ExpenseModel.find_by_project_id(project_id)
        if expenses:
            return [expense.json() for expense in expenses]
        return {'message': 'No expenses found for this project'}, 200
    
    def post(self, project_id):
        expenses = ExpenseModel.insertExpense(project_id)
        if expenses:
            return {'message': 'User not found'}, 404
        return [expense.json() for expense in expenses]

class Expense(Resource):
    def put(self, expense):
        expense = ExpenseModel.find_by_expense_id(expense.expense_id)
        if expense:
            return {'message': 'Expense not found'}, 404
        ExpenseModel.updateExpense(expense)
        return {'message': 'Expense successfully updated'}, 200
    
    def delete(self, expense):
        expense = ExpenseModel.find_by_expense_id(expense.expense_id)
        if expense:
            return {'message': 'Expense not found'}, 404
        ExpenseModel.deleteExpense(expense)
        return {'message': 'Expense successfully deleted'}, 200


