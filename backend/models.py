import os
from sqlalchemy import Column, String, Integer, create_engine, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
from sqlalchemy import create_engine, Sequence
from sqlalchemy.sql import func
# from sqlalchemy.orm import sessionmaker
from werkzeug.security import check_password_hash, generate_password_hash
from helper import convert_currency, currency_symbol



# database_name = 'expense_tracker'
# database_path = "postgresql://{}:{}@{}/{}".format(
#     "postgres", "admin", "localhost:5432", database_name
# )

database_path = os.environ.get("DATABASE_URL")

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
    base_currency = Column(String(3), nullable=False, default='NGN')
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    # time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, username, email, password, base_currency='NGN'):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.base_currency = base_currency
        self.time_created

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def format(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'base_currency': self.base_currency,
            'currency_symbol': currency_symbol(self.base_currency),
            'time_created': self.time_created
            }
    
    def update_base_currency(self, new_base_currency):
        if self.base_currency == new_base_currency:
            return

        old_base_currency = self.base_currency
        self.base_currency = new_base_currency
        db.session.commit()

        # Update expenses
        expenses = Expense.query.filter_by(user_id=self.id)
        for expense in expenses:
            expense.price = convert_currency(expense.price, old_base_currency, new_base_currency)
            db.session.add(expense)

        # Update incomes
        incomes = Income.query.filter_by(user_id=self.id)
        for income in incomes:
            income.price = convert_currency(income.price, old_base_currency, new_base_currency)
            db.session.add(income)

        db.session.commit()

"""
Category

"""
class UserCategory(db.Model):
    __tablename__ = "usercategories"
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete='CASCADE'), primary_key=True)

    def __init__(self, user_id, category_id):
        self.user_id = user_id
        self.category_id = category_id

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
            'type': self.type
            }

class Category(db.Model):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False, unique=True)

    def __init__(self, type):
        self.type = type
    
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
            'type': self.type
            }

def get_categories(user_id):
    categories = Category.query.join(UserCategory).filter(UserCategory.user_id == user_id).all()
    return categories


"""
Expenses

"""
class Expense(db.Model):
    __tablename__ = 'expenses'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)
    name = Column(String, nullable=False)
    initial_price = Column(Numeric(15, 1), nullable=False)
    price = Column(Numeric(15, 1), nullable=False)
    currency_code = Column(String(3), nullable=False) 
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    category = relationship("Category", backref="expenses", lazy="joined")


    def __init__(self, user_id, category_id, name, price, currency_code):
        self.user_id = user_id
        self.category_id = category_id
        self.name = name
        self.initial_price = price
        self.price = convert_currency(price, currency_code, User.query.get(user_id).base_currency)
        self.currency_code = currency_code
        self.time_created

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        base_currency = User.query.get(self.user_id).base_currency
        self.price = convert_currency(self.price, self.currency_code, base_currency)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'category_name': self.category.type,
            'name': self.name,
            'initial_price': self.initial_price,
            'price': str(self.price),
            'currency_code': self.currency_code,
            'time_created': self.time_created
            }


"""
Income

"""
class Income(db.Model):
    __tablename__ = 'income'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    initial_price = Column(Numeric(15, 1), nullable=False)
    price = Column(Numeric(15, 1), nullable=False)
    currency_code = Column(String(3), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, user_id, name, price, currency_code):
        self.user_id = user_id
        self.name = name
        self.initial_price = price
        self.price = convert_currency(price, currency_code, User.query.get(user_id).base_currency)
        self.currency_code = currency_code
        self.date

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        base_currency = User.query.get(self.user_id).base_currency
        self.price = convert_currency(self.price, self.currency_code, base_currency)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'initial_price': self.initial_price,
            'price': str(self.price),
            'currency_code': self.currency_code,
            'date': self.date
            }