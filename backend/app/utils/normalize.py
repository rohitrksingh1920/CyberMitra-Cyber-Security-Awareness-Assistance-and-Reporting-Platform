import re


def normalize_entity(value: str, entity_type: str) -> str:
    value = value.strip()
    if entity_type == "phone":
        digits = re.sub(r"\D", "", value)
        # keep last 10 digits (Indian mobile numbers), drop country code if present
        return digits[-10:] if len(digits) >= 10 else digits
    if entity_type == "upi":
        return value.lower()
    if entity_type == "url":
        v = value.lower()
        v = re.sub(r"^https?://", "", v)
        v = re.sub(r"^www\.", "", v)
        return v.rstrip("/")
    return value
