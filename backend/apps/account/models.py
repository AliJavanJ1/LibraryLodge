from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from services.sql_app.database import Base
from sqlalchemy.dialects.postgresql import ENUM

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    is_deleted = Column(Boolean)
