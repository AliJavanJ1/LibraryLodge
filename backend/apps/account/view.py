import aiofiles
import os

from fastapi import APIRouter, Depends, HTTPException, UploadFile, Request
from slowapi.util import get_remote_address
from fastapi.responses import HTMLResponse
from services.sql_app.database import get_db
from . import schemas, crud, models

router = APIRouter(
    prefix='/account',
    tags=['account']
)


@router.post('/signup')
def register(request: Request, user: schemas.RegisterUser, db=Depends(get_db)):
    user_db = crud.get_user(db, user.username)
    if user_db:
        raise HTTPException(status_code=400, detail="exist user with this username")
    crud.create_user(db, user)
    return 'user created'

@router.post('/login')
def login(request: Request, user: schemas.UserLogin, db=Depends(get_db)):
    user_login = crud.get_user(db, username=user.username, password=user.password)
    if not user_login:
        raise HTTPException(status_code=400, detail="usename or password is incorrect")
    return crud.login(db, user_login.id)

@router.post('/logout')
def logout(request: Request, user: schemas.UserLogout, db=Depends(get_db)):
    user_logout = crud.get_token(db, token=user.token)
    if not user_logout:
        raise HTTPException(status_code=400, detail="token not exist!")
    return crud.logout(db, user_logout)
