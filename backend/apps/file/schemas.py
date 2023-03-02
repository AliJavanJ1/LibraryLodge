from pydantic import BaseModel
from typing import Optional

class FileUpload(BaseModel):
    desc: Optional[str]
    extra_info: dict
    attachments: dict