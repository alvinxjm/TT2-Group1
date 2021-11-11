import hashlib
import json
<<<<<<< HEAD
=======
import dateutil.parser
>>>>>>> 73ecb810410b6038156c3782bc8faba09f2da064
from db import db
from datetime import datetime

class CategoryModel(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable = False)
<<<<<<< HEAD
    project_id = db.Column(db.String(80), nullable = True)

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
=======
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, name):
        self.name = name
    
    def json(self):
        return {'name': self.name}
>>>>>>> 73ecb810410b6038156c3782bc8faba09f2da064

