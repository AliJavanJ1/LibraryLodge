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


@router.post("/upload")
@limiter.limit("150/minute")
async def upload_file(request: Request, token: str, file: UploadFile, upload_info: schemas.FileUpload, db=Depends(get_db)):
    if not user_crud.is_user(db, token):
        raise HTTPException(status_code=401, detail="for upload video, login first")
    path = f'{os.getcwd()}/static/{file.filename}'
    async with aiofiles.open(path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    file_path=file.filename
    user_id=user_crud.get_token(db, token).user_id
    crud.upload_video(db, v)
    return f'file {file.filename} uploaded!'