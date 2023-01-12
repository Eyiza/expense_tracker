import os
from sqlalchemy import Column, String, Integer, create_engine, DateTime, Numeric, ForeignKey
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
from sqlalchemy.sql import func


database_name = 'expense_tracker'
# database_path = 'postgresql://{}/{}'.format('localhost:5432', database_name)
database_path = "postgresql://{}:{}@{}/{}".format(
    "postgres", "admin", "localhost:5432", database_name
)

db = SQLAlchemy()
migrate = Migrate()


"""
setup_db(app)
    binds a flask application and a SQLAlchemy service
"""
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # db.app = app
    db.init_app(app)
    migrate.init_app(app, db)
    db.create_all()

"""
User

"""
class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.time_created
        self.time_updated

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'time_created': self.time_created,
            'time_updated': self.time_updated
            }

"""
Category

"""
class Category(db.Model):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False)

    def __init__(self, type):
        self.type = type

    def format(self):
        return {
            'id': self.id,
            'type': self.type
            }


"""
Expenses

"""
class Expense(db.Model):
    __tablename__ = 'expenses'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)
    name = Column(String, nullable=False)
    amount = Column(Numeric(15, 6), nullable=False)
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, user_id, category_id, name, amount):
        self.user_id = user_id
        self.category_id = category_id
        self.name = name
        self.amount = amount
        self.time_created

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'name': self.name,
            'amount': self.amount,
            'time_created': self.time_created
            }


"""
Income

"""
class Income(db.Model):
    __tablename__ = 'income'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    amount = Column(Numeric(15, 6), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, user_id, amount):
        self.user_id = user_id
        self.amount = amount
        self.date

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'amount': self.amount,
            'date': self.date
            }