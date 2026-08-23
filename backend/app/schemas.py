from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models import ComplaintStatus, CrimeType


# ---------- Complaints ----------

class ComplaintCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    contact_number: str = Field(min_length=6, max_length=20)
    incident_date: Optional[str] = None
    crime_type: CrimeType = CrimeType.OTHER
    description: str = Field(min_length=10, max_length=5000)
    evidence_notes: Optional[str] = Field(default=None, max_length=3000)

    @field_validator("contact_number")
    @classmethod
    def basic_phone_check(cls, v: str) -> str:
        digits = "".join(ch for ch in v if ch.isdigit())
        if len(digits) < 6:
            raise ValueError("contact_number does not look valid")
        return v


class ComplaintPublic(BaseModel):
    reference_code: str
    name: str
    contact_number: str
    incident_date: Optional[str]
    crime_type: CrimeType
    description: str
    evidence_notes: Optional[str]
    status: ComplaintStatus
    created_at: datetime

    model_config = {"from_attributes": True}


class ComplaintAdminUpdate(BaseModel):
    status: Optional[ComplaintStatus] = None
    admin_notes: Optional[str] = None


# ---------- Suspect checker ----------

class SuspectCheckRequest(BaseModel):
    value: str = Field(min_length=3, max_length=200)
    entity_type: str = Field(pattern="^(phone|upi|url)$")


class SuspectCheckResponse(BaseModel):
    found: bool
    report_count: int = 0
    last_category: Optional[str] = None
    message: str


class SuspectReportCreate(BaseModel):
    value: str = Field(min_length=3, max_length=200)
    entity_type: str = Field(pattern="^(phone|upi|url)$")
    category: Optional[str] = Field(default=None, max_length=100)
    notes: Optional[str] = Field(default=None, max_length=1000)


# ---------- Contact ----------

class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=5, max_length=3000)


# ---------- Quiz ----------

class QuizResultCreate(BaseModel):
    score: int = Field(ge=0)
    total: int = Field(gt=0)
    name: Optional[str] = Field(default=None, max_length=120)


# ---------- Pledge ----------

class PledgeCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    city: Optional[str] = Field(default=None, max_length=120)
