from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import desc
from fastapi.templating import Jinja2Templates
import asyncpg
from . import models, schemas


def is_user(db: Session, token: str):
    user = db.query(models.UserLoginToken).filter(models.UserLoginToken.token == token).first()
    if user:
        return True
    else:
        return False
    

def get_profile(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user


def create_user(db: Session, user: schemas.RegisterUser):
    db_user = models.User(
        username=user.username,
        password=user.password,
        email = user.email,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return login(db, db_user.id)

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


def update_user(db: Session, user_id: int, username: str = None, email: str = None, password: str= None):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.password = password

        db.commit()
        db.refresh(user)

        return {"message": f"User with ID {user_id} updated successfully"}
    return {"error": "User not found"}