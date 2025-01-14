from fastapi import FastAPI, HTTPException, APIRouter
import uvicorn
from apps.account import models as account_models, view as account_view
from apps.file import models as file_models, view as file_view
from services.sql_app.database import engine
from fastapi.staticfiles import StaticFiles
from starlette_validation_uploadfile import ValidateUploadFileMiddleware
from fastapi.middleware.cors import CORSMiddleware

account_models.Base.metadata.create_all(bind=engine)
file_models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix='/api')

app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@router.get("/")
def healthy_check():
    return 'I am healthy'

router.include_router(account_view.router)
router.include_router(file_view.router)

app.include_router(router)


if __name__ == '__main__':
    print("Starting Application...")

    uvicorn.run(
        app='main:app',
        host='localhost',
        port=8080,
        workers=1,
        log_level='info'
    )
