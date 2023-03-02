import aiofiles
import os

from fastapi import APIRouter, Depends, HTTPException, UploadFile, Request
from slowapi.util import get_remote_address
from slowapi import Limiter
from fastapi.responses import HTMLResponse
from services.sql_app.database import get_db
from . import schemas, crud, models
from ..account import crud as user_crud


router = APIRouter(
    prefix='/dashboard',
    tags=['dashboard']
)
limiter = Limiter(key_func=get_remote_address)


def validate_user(db, token):
    if not user_crud.is_user(db, token):
        raise HTTPException(status_code=401, detail="for upload video, login first")
    user_id = user_crud.get_token(db, token).user_id
    return user_id

@router.post("/upload")
@limiter.limit("150/minute")
async def upload_file(request: Request, token: str, file: UploadFile, upload_info: schemas.FileUpload, db=Depends(get_db)):
    user_id = validate_user(db, token)
    path = f'{os.getcwd()}/static/{file.filename}'
    async with aiofiles.open(path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    file_path=file.filename
    crud.upload_file(db, user_id, file_path, upload_info)
    return f'file {file.filename} uploaded!'

# TODO: conventions with frontend
@router.get("/file/{file_id}", response_class=HTMLResponse)
@limiter.limit("150/minute") 
def get_file(request: Request, token: str, file_id: int, db=Depends(get_db)):
    validate_user(db, token)
    return crud.get_file(db, file_id, request)