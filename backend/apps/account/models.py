from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from services.sql_app.database import Base
from sqlalchemy.dialects.postgresql import ENUM
from typing import Optional

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    email = Column(String)

class UserLoginToken(Base):
    __tablename__ = "login_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    token = Column(String, unique=True)

