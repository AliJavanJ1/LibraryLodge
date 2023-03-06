from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates
from uuid import uuid4
from fastapi.responses import FileResponse
import os

from . import models, schemas

templates = Jinja2Templates(directory="templates")


def upload_file(db, user_id, file_name, file_type, file_upload_info: schemas.FileUpload):
    if file_type == "FILE":
        db_file = models.File(
            user_id=user_id,
            name=file_name,
            type=file_type,
            desc = file_upload_info.desc,
            extra_info = file_upload_info.extra_info,
            attachments = file_upload_info.attachments
        )
    elif file_type == "ATTACHMENT":
        db_file = models.File(
            user_id=user_id,
            name=file_name,
            type=file_type
        )

    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    if file_type == "FILE" and file_upload_info.library_id is not None:
        save_library_file_relation(db, db_file.id, file_upload_info.library_id)

    return db_file.id

def save_library_file_relation(db: Session, file_id: int, library_id: int):
    db_file_lib_relation = models.FileLibrary(
        file_id = file_id,
        lib_id = library_id
    )
    db.add(db_file_lib_relation)
    db.commit()
    db.refresh(db_file_lib_relation)
    

def create_library(db: Session, library: schemas.CreateLibrary, user_id: int):
    db_library = models.Library(
        name=library.name,
        user_id=user_id,
        file_template_id=library.file_template_id,

    )
    db.add(db_library)
    db.commit()
    db.refresh(db_library)
    return db_library.id

def create_file_template(db: Session, fileTemplate: schemas.CreateFileTemplate, user_id: int):
    db_file_template = models.FileTemplates(
        name = fileTemplate.name,
        user_id = user_id,
        attachments = fileTemplate.attachments,
        extra_informations = fileTemplate.extra_info
    )
    db.add(db_file_template)
    db.commit()
    db.refresh(db_file_template)
    return db_file_template.id


def add_attachment(db: Session, file_id, key, attachment_id):
    file = db.query(models.File).filter(models.File.id == file_id).one()
    file.attachments[key] = attachment_id
    db.query(models.File).filter(models.File.id == file_id).update(
        {models.File.attachments: file.attachments})
    db.commit()


def get_file(db: Session, file_id: int, request):
    file = db.query(models.File).filter(models.File.id == file_id).first()
    if not file:
        return f'No File with file id {file_id}!'
    file_path = file.name
    user_id = file.user_id
    desc = file.desc
    extra_info = file.extra_info
    attachments = file.attachments

    return templates.TemplateResponse(
        "page.html",
        {
            "request": request,
            "file_path": file_path,
            "desc": desc,
            "extra_info": extra_info,
            "attachments": attachments,
            "user_id": user_id
        }
    )
def download_file(file_id: int, db: Session ):
    file = db.query(models.File).filter(models.File.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")

    path = f'{os.getcwd()}/static/{file.name}'
    return FileResponse(path, filename=file.name)

def get_files(db: Session, user_id: int):
    files = db.query(models.File).filter(models.File.user_id == user_id).all()
    return files

def delete_file(file_id: int, db: Session):
    file = db.query(models.File).filter(models.File.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    db.delete(file)
    db.commit()
    return {"message": "File deleted successfully."}

