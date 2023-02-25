from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, JSON
from services.sql_app.database import Base
from sqlalchemy.dialects.postgresql import ENUM


class File(Base):
    __tablename__ = "files"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    desc = Column(String)
    extra_info = Column(JSON)
    attachments = Column(JSON)

class Library(Base):
    __tablename__ = "libraries"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    desc = Column(String)
    allowed_suffixes = Column(JSON)


class FileLibrary(Base):
    __tablename__ = "filelibraries"

    file_id = Column(String, ForeignKey("files.id"))
    lib_id = Column(String, ForeignKey("libraries.id"))


class StandardExtraInfos(Base):
    __tablename__ = "standard_extra_infos"

    type = Column(String, primary_key=True, index=True)
    allowed_info = Column(JSON)

class StandardAttachments(Base):
    __tablename__ = "standard_attachments"

    type = Column(String, primary_key=True, index=True)
    allowed_attachments = Column(JSON)