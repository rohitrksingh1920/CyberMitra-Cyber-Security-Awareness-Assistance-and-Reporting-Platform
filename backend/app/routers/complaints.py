from fastapi import APIRouter, Depends, HTTPException, Header, Query, Request
from sqlmodel import Session, select

from app.database import get_session
from app.models import Complaint
from app.schemas import ComplaintCreate, ComplaintPublic, ComplaintAdminUpdate
from app.utils.reference import generate_reference_code
from app.config import settings
from app.limiter import limiter

router = APIRouter(prefix="/complaints", tags=["Complaints"])


def require_admin(x_admin_key: str = Header(default="")):
    if x_admin_key != settings.ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing admin key")


@router.post("", response_model=ComplaintPublic, status_code=201)
@limiter.limit("5/minute")
def create_complaint(request: Request, payload: ComplaintCreate, session: Session = Depends(get_session)):
    """Submit a complaint/FIR draft. Returns a reference code the citizen can
    use to track status. This is a CyberMitra-side draft only — citizens are
    still guided to file at cybercrime.gov.in / call 1930 for official action."""
    code = generate_reference_code()
    # Extremely unlikely collision, but guard anyway.
    while session.exec(select(Complaint).where(Complaint.reference_code == code)).first():
        code = generate_reference_code()

    complaint = Complaint(
        reference_code=code,
        name=payload.name,
        contact_number=payload.contact_number,
        incident_date=payload.incident_date,
        crime_type=payload.crime_type,
        description=payload.description,
        evidence_notes=payload.evidence_notes,
    )
    session.add(complaint)
    session.commit()
    session.refresh(complaint)
    return complaint


@router.get("/{reference_code}", response_model=ComplaintPublic)
def track_complaint(reference_code: str, session: Session = Depends(get_session)):
    complaint = session.exec(
        select(Complaint).where(Complaint.reference_code == reference_code.upper())
    ).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="No complaint found with that reference code")
    return complaint


@router.get("", response_model=list[ComplaintPublic], dependencies=[Depends(require_admin)])
def list_complaints(
    session: Session = Depends(get_session),
    limit: int = Query(default=50, le=200),
    offset: int = Query(default=0, ge=0),
):
    """Admin-only: list complaints. Requires X-Admin-Key header."""
    complaints = session.exec(
        select(Complaint).order_by(Complaint.created_at.desc()).offset(offset).limit(limit)
    ).all()
    return complaints


@router.patch("/{reference_code}", response_model=ComplaintPublic, dependencies=[Depends(require_admin)])
def update_complaint(
    reference_code: str, payload: ComplaintAdminUpdate, session: Session = Depends(get_session)
):
    """Admin-only: update status / notes. Requires X-Admin-Key header."""
    complaint = session.exec(
        select(Complaint).where(Complaint.reference_code == reference_code.upper())
    ).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="No complaint found with that reference code")
    if payload.status is not None:
        complaint.status = payload.status
    if payload.admin_notes is not None:
        complaint.admin_notes = payload.admin_notes
    from app.models import utcnow
    complaint.updated_at = utcnow()
    session.add(complaint)
    session.commit()
    session.refresh(complaint)
    return complaint
