import enum
from datetime import datetime, timezone
from typing import Optional

from sqlmodel import SQLModel, Field


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class ComplaintStatus(str, enum.Enum):
    RECEIVED = "received"
    UNDER_REVIEW = "under_review"
    GUIDANCE_SENT = "guidance_sent"
    CLOSED = "closed"


class CrimeType(str, enum.Enum):
    FINANCIAL_FRAUD = "financial_fraud"
    IDENTITY_THEFT = "identity_theft"
    SOCIAL_MEDIA = "social_media"
    ONLINE_GAMING = "online_gaming"
    JOB_SCAM = "job_scam"
    LOAN_APP = "loan_app"
    UPI_FRAUD = "upi_fraud"
    DIGITAL_ARREST = "digital_arrest"
    CYBERBULLYING = "cyberbullying"
    DATA_PRIVACY = "data_privacy"
    OTHER = "other"


class Complaint(SQLModel, table=True):
    """A citizen-submitted FIR / complaint draft. This does NOT replace the
    official cybercrime.gov.in filing (we always tell users to file there too);
    it lets CyberMitra track the draft and give the person a reference number
    so they can follow up."""

    id: Optional[int] = Field(default=None, primary_key=True)
    reference_code: str = Field(index=True, unique=True)

    name: str
    contact_number: str
    incident_date: Optional[str] = None  # stored as ISO date string from the form
    crime_type: CrimeType = Field(default=CrimeType.OTHER)
    description: str
    evidence_notes: Optional[str] = None

    status: ComplaintStatus = Field(default=ComplaintStatus.RECEIVED)
    admin_notes: Optional[str] = None

    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class SuspectEntity(SQLModel, table=True):
    """Crowd-reported suspicious phone numbers / UPI IDs / URLs, so the
    'Check a number' widget can warn future visitors."""

    id: Optional[int] = Field(default=None, primary_key=True)
    value: str = Field(index=True)  # normalized phone/UPI/URL
    entity_type: str  # "phone" | "upi" | "url"
    report_count: int = Field(default=1)
    last_category: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class SuspectReportLog(SQLModel, table=True):
    """Individual report events kept for audit, linked loosely to SuspectEntity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    entity_value: str = Field(index=True)
    entity_type: str
    category: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)


class ContactMessage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=utcnow)


class QuizResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    score: int
    total: int
    name: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)


class PledgeSignature(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    city: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)
