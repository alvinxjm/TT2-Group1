import hashlib
import json
import dateutil.parser
from models.category import CategoryModel
from db import db
from datetime import datetime

class ExpenseModel(db.Model):
    __tablename__ = 'expense'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    # category_id = db.relationship(CategoryModel)
    name = db.Column(db.String(80), nullable = False)
    description = db.Column(db.String(50), nullable = False)
    amount = db.Column(db.Float(precision=2), nullable = False)
    created_at = db.Column(db.DateTime, nullable = True)
    created_by = db.Column(db.String(80), nullable = True)
    updated_at = db.Column(db.DateTime, nullable = True)
    updated_by = db.Column(db.String(80), db.ForeignKey('user.id'), nullable = True)

    def __init__(self, 
        project_id=project_id, 
        category_id=category_id, 
        name=name, 
        description=description, 
        amount=amount, 
        created_at=None, 
        created_by=created_by, 
        updated_at=None, 
        updated_by=updated_by):
        # self.id = id
        self.project_id = project_id
        self.category_id = category_id
        self.name = name
        self.description = description
        self.amount = amount

        if created_at:
            self.created_at = created_at
        else:
            self.created_at = datetime.now()
        self.created_by = created_by
        if updated_at:
            self.updated_at = updated_at
        else:
            self.updated_at = datetime.now()
        self.updated_by = updated_by

    def json(self):
        return {'id': self.id, 
        'project_id': self.project_id,
        'category_id': self.category_id,
        'name': self.name, 
        'description': self.description, 
        'amount': self.amount, 
        'created_at': str(self.created_at),
        'created_by': self.created_by,
        'updated_at': str(self.updated_at),
        'updated_by': self.updated_by,
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_project_id(cls, project_id):
        return cls.query.filter_by(project_id=project_id).all()

    @classmethod
    def find_by_expense_id(cls, expense_id):
        return cls.query.filter_by(id=expense_id).first()

    @classmethod
    def insertExpense(cls, expense):
        cls.save(expense)
        return expense

    @classmethod
    def deleteExpense(cls, expense):
        db.session.delete(expense)
        db.session.commit()
        return 

