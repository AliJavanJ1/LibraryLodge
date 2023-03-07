from pydantic import BaseModel
from typing import Optional
import json

class FileUpload(BaseModel):
    desc: Optional[str]
    extra_info: dict
    attachments: dict
    library_id: Optional[int] = None

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
class AttachmentUpload(BaseModel):
    file_id: str
    key: str

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

class CreateLibrary(BaseModel):
    name: str
    file_template_id: int
 
class CreateFileTemplate(BaseModel):
    name: str
    attachments: list
    extra_info: list