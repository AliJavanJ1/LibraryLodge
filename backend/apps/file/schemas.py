from pydantic import BaseModel
from typing import Optional

class FileUpload(BaseModel):
    desc: Optional[str]
    extra_info: dict
    attachments: dict

class CreateLibrary(BaseModel):
    name: str
    file_template_id: int
 
class CreateFileTemplate(BaseModel):
    name: str
    attachments: list
    extra_info: list