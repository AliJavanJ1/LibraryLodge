from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates

from . import models, schemas


def create_user(db: Session, user: schemas.RegisterUser):
    db_user = models.User(
        username=user.username,
        password=user.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user