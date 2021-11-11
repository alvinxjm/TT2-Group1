import hashlib
import json
import dateutil.parser
from db import db
from datetime import datetime

class ProjectModel(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80))
    description = db.Column(db.String(50))
    budget = db.Column(db.Float(precision=2))
    user_id = db.Column(db.Integer, db.ForeignKey('stores.id'))


    def __init__(self, name, description, budget, user_id):
        # self.id = id
        self.description = description
        self.budget = budget
        self.user_id = user_id
        self.name = name

    def json(self):
        return {'id': self.id, 'name': self.name, 'description': self.description, 'budget': self.budget, 'user_id': self.user_id}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
