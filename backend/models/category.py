import hashlib
import json
import dateutil.parser
from db import db
from datetime import datetime

class CategoryModel(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable = False)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, name):
        # self.id = id
        self.name = name

    def json(self):
        return {'id': self.id, 
        'name': self.name, 
        }

    @classmethod
    def getCategory(cls):
        return cls.query.all()

    @classmethod
    def getCategories(cls, id):
        return cls.query.filter_by(id=id).all()

    def __init__(self, name):
        self.name = name
    
    def json(self):
        return {'name': self.name}

