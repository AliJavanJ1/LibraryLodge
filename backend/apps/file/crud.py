from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates
from uuid import uuid4

from . import models, schemas

templates = Jinja2Templates(directory="templates")


def upload_file(db, user_id, file_name, file_upload_info: schemas.FileUpload):
    id = str(uuid4())
    db_file = models.File(
        id=id,
        user_id=user_id,
        name=file_name,
        desc = file_upload_info.desc,
        extra_info = file_upload_info.extra_info,
        attachments = file_upload_info.attachments
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def get_file(db: Session, file_id: int, request):
    file = db.query(models.File).filter(models.File.id == file_id).first()
    if not file:
        return 'No File!'
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