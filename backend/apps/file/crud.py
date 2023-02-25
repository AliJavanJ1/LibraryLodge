from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates
from uuid import uuid4

from . import models, schemas

def upload_file(db, file_name, file_upload_info: schemas.FileUpload):
    id = str(uuid4())
    db_file = models.File(
        id=id,
        name=file_name,
        desc = file_upload_info.desc,
        extra_info = file_upload_info.extra_info,
        attachments = file_upload_info.attachments
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file