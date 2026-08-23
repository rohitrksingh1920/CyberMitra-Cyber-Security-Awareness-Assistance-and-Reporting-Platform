from fastapi import APIRouter, Depends, Request
from sqlmodel import Session, select

from app.database import get_session
from app.models import SuspectEntity, SuspectReportLog, utcnow
from app.schemas import SuspectCheckRequest, SuspectCheckResponse, SuspectReportCreate
from app.utils.normalize import normalize_entity
from app.limiter import limiter

router = APIRouter(prefix="/suspects", tags=["Suspect Checker"])


@router.post("/check", response_model=SuspectCheckResponse)
@limiter.limit("20/minute")
def check_suspect(request: Request, payload: SuspectCheckRequest, session: Session = Depends(get_session)):
    """Check whether a phone number, UPI ID, or URL has been reported by
    other CyberMitra users before. This is community-sourced data, not an
    official government blocklist — always verify independently."""
    normalized = normalize_entity(payload.value, payload.entity_type)
    entity = session.exec(
        select(SuspectEntity).where(
            SuspectEntity.value == normalized, SuspectEntity.entity_type == payload.entity_type
        )
    ).first()

    if not entity:
        return SuspectCheckResponse(
            found=False,
            report_count=0,
            message="No reports found for this yet. That doesn't guarantee it's safe — stay cautious.",
        )

    return SuspectCheckResponse(
        found=True,
        report_count=entity.report_count,
        last_category=entity.last_category,
        message=f"⚠ This has been reported {entity.report_count} time(s) by other users. Proceed with caution.",
    )


@router.post("/report", status_code=201)
@limiter.limit("10/minute")
def report_suspect(request: Request, payload: SuspectReportCreate, session: Session = Depends(get_session)):
    """Report a suspicious phone number / UPI ID / URL so others get warned."""
    normalized = normalize_entity(payload.value, payload.entity_type)

    entity = session.exec(
        select(SuspectEntity).where(
            SuspectEntity.value == normalized, SuspectEntity.entity_type == payload.entity_type
        )
    ).first()

    if entity:
        entity.report_count += 1
        entity.last_category = payload.category or entity.last_category
        entity.updated_at = utcnow()
        session.add(entity)
    else:
        entity = SuspectEntity(
            value=normalized,
            entity_type=payload.entity_type,
            report_count=1,
            last_category=payload.category,
        )
        session.add(entity)

    log = SuspectReportLog(
        entity_value=normalized,
        entity_type=payload.entity_type,
        category=payload.category,
        notes=payload.notes,
    )
    session.add(log)
    session.commit()
    return {"message": "Thanks — this has been logged to help warn other users.", "value": normalized}
