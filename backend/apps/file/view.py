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
def get_file(request: Request, token: str, file_id: int, db=Depends(get_db)):
    validate_user(db, token)
    return crud.get_file(db, file_id, request)

@router.post("/create/library")
def create_Library(request: Request, token: str, library: schemas.CreateLibrary, db=Depends(get_db)):
    user_id = validate_user(db, token)
    return crud.create_library(db, library, user_id)
    
@router.post("/create/file-template")
def create_file_template(request: Request, token: str, fileTemplate: schemas.CreateFileTemplate, db=Depends(get_db)):
    user_id = validate_user(db, token)
    return crud.create_file_template(db, fileTemplate, user_id)

@router.get("/download/{file_id}")
def download_file(file_id: int, token: str, db=Depends(get_db)):
    validate_user(db, token)
    return crud.download_file(file_id, db)

@router.get("/all_files")
def gets_all_files(token: str, db=Depends(get_db)):
    validate_user(db, token)
    return crud.get_files(db)
@router.delete("/delete_file/{file_id}")
def delete_file(file_id: int, token: str, db=Depends(get_db)):
    validate_user(db, token)
    return crud.delete_file(file_id, db)