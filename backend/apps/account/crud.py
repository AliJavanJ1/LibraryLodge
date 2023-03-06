from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates

from . import models, schemas


def is_user(db: Session, token: str):
    user = db.query(models.UserLoginToken).filter(models.UserLoginToken.token == token).first()
    if user:
        return True
    else:
        return False
    
def create_user(db: Session, user: schemas.RegisterUser):
    db_user = models.User(
        username=user.username,
        password=user.password,
        email = user.email,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user(db: Session, username: str, password: str):
    return db.query(models.User).filter(models.User.username == username, models.User.password == password).first()


def get_token(db: Session, token: str):
    return db.query(models.UserLoginToken).filter(models.UserLoginToken.token == token).first()

def login(db: Session, user_id: int):
    db_user_login = db.query(models.UserLoginToken).filter(models.UserLoginToken.user_id == user_id).first()
    if db_user_login:
        return db_user_login.token
    db_user_login = models.UserLoginToken(
        user_id=user_id,
        token=uuid4()
    )
    db.add(db_user_login)
    db.commit()
    db.refresh(db_user_login)
    return db_user_login.token

def logout(db: Session, user_logout_token: models.UserLoginToken):
    db.delete(user_logout_token)
    db.commit()
    return user_logout_token.token
