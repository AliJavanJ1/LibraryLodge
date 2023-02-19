from pydantic import BaseModel


class RegisterUser(BaseModel):
    username: str
    password: str
    name: str


class UserLogin(BaseModel):
    username: str
    password: str

class UserLogout(BaseModel):
    token: str