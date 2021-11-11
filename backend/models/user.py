import hashlib
import json
import dateutil.parser
from db import db
from datetime import datetime

class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    name = db.Column(db.String(80))
    appointment = db.Column(db.String(80))


    def __init__(self, username, password, name, appointment):
        # self.id = id
        self.username = username
        self.password = hashlib.sha256(password.encode()).hexdigest()
        self.name = name
        self.appointment = appointment

    def json(self):
        return {'id': self.id, 'username': self.username, 'password': self.password, 'name': self.name, 'appointment': self.appointment}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
