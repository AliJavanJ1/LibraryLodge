from fastapi import FastAPI, HTTPException
import uvicorn
from apps.account import models as account_models, view as account_view
from apps.file import models as file_models, view as file_view
from services.sql_app.database import engine
from fastapi.staticfiles import StaticFiles
from starlette_validation_uploadfile import ValidateUploadFileMiddleware

account_models.Base.metadata.create_all(bind=engine)
file_models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(account_view.router)
app.include_router(file_view.router)


@app.get("/")
def healthy_check():
    return 'I am healthy'


if __name__ == '__main__':
    print("Starting Application...")

    uvicorn.run(
        app='main:app',
        host='localhost',
        port=8080,
        workers=1,
        log_level='info'
    )
