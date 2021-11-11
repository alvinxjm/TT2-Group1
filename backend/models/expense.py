import hashlib
import json
import dateutil.parser
from db import db
from datetime import datetime

class ExpenseModel(db.Model):
    __tablename__ = 'expense'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable = False)
    category_id = db.Column(db.Integer, nullable = False)
    name = db.Column(db.String(80), nullable = False)
    description = db.Column(db.String(50), nullable = False)
    amount = db.Column(db.Float(precision=2), nullable = False)
    created_at = db.Column(db.DateTime, nullable = True)
    created_by = db.Column(db.String(80), nullable = True)
    updated_at = db.Column(db.DateTime, nullable = True)
    updated_by = db.Column(db.String(80), nullable = True)

    def __init__(self, project_id, category_id, name, description, amount, created_at, created_by, updated_at, updated_by):
        # self.id = id
        self.project_id = project_id
        self.category_id = category_id
        self.name = name
        self.description = description
        self.amount = amount
        self.created_at = created_at
        self.created_by = created_by
        self.updated_at = updated_at
        self.updated_by = updated_by

    def json(self):
        return {'id': self.id, 'name': self.name, 'description': self.description, 'budget': self.budget, 'user_id': self.user_id}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_project_id(cls, project_id):
        return cls.query.filter_by(project_id=project_id).all()

    @classmethod
    def insertExpense(cls, expense):
        return 

    @classmethod
    def updateExpense(cls, expense):
        return 

    @classmethod
    def deleteExpense(cls, expense_id):
         return 

