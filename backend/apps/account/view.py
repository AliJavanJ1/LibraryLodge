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
    print('sag')
    crud.create_user(db, user)
    return 'user created'