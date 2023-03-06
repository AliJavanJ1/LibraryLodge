from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, JSON, ARRAY
from services.sql_app.database import Base
from sqlalchemy.dialects.postgresql import ENUM

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    desc = Column(String)
    extra_info = Column(JSON)
    attachments = Column(JSON)
    file_template_id = Column(Integer, ForeignKey('file_templates.id'))

class Library(Base):
    __tablename__ = "libraries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_template_id = Column(Integer, ForeignKey('file_templates.id'))
    accepted_file = Column(ARRAY(String))
    
class FileTemplates(Base):
    __tablename__ = "file_templates"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String)
    attachments = Column(JSON)
    extra_informations = Column(JSON)

class FileLibrary(Base):
    __tablename__ = "filelibraries"
    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    lib_id = Column(Integer, ForeignKey("libraries.id"))
