from pydantic import BaseModel


class RegisterUser(BaseModel):
    username: str
    password: str
    email: str


class UserLogin(BaseModel):
    username: str
    password: str
