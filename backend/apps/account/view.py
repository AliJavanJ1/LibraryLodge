import aiofiles
import os

from fastapi import APIRouter, Depends, HTTPException, UploadFile, Request, Response
from slowapi.util import get_remote_address
from fastapi.responses import HTMLResponse
from services.sql_app.database import get_db
from . import schemas, crud, models

router = APIRouter(
    prefix='/account',
    tags=['account']
)

def validate_user(db, token):
    if not crud.is_user(db, token):
        raise HTTPException(status_code=401, detail="for upload video, login first")
    user_id = crud.get_token(db, token).user_id
    return user_id

@router.post('/signup')
def register(request: Request, user: schemas.RegisterUser, db=Depends(get_db)):
    user_db = crud.get_user_by_username(db, user.username)
    if user_db:
        raise HTTPException(status_code=400, detail="exist user with this username")
    return crud.create_user(db, user)
    

@router.post('/login')
def login(response: Response, request: Request, user: schemas.UserLogin, db=Depends(get_db)):
    user_login = crud.get_user(db, username=user.username, password=user.password)
    if not user_login:
        raise HTTPException(status_code=400, detail="usename or password is incorrect")
    token = crud.login(db, user_login.id)
    response.set_cookie(key='session', value=token)

@router.post('/logout')
def logout(response: Response, request: Request, db=Depends(get_db)):
    user_logout = crud.get_token(db, request.headers['session'])
    if not user_logout:
        raise HTTPException(status_code=400, detail="token not exist!")
    return crud.logout(db, user_logout)


@router.get('/profile')
def getProfile(request: Request, db=Depends(get_db)):
    user_id = validate_user(db, request.headers['session'])
    return crud.get_profile(user_id)