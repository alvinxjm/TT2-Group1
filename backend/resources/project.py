from flask_restful import Resource, reqparse
from models.project import ProjectModel
import json
import hashlib

class ProjectsByUserID(Resource):
    def get(self, user_id):
        projects = ProjectModel.find_by_username(user_id)
        if projects:
            return [project.json() for project in projects]
        return {'message': 'User not found'}, 404
    
class AllProjects(Resource):
    def get(self):
        projects = ProjectModel.query.all()
        return [project.json() for project in projects], 200

