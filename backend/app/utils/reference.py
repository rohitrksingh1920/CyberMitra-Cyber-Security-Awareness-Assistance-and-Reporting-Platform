import random
import string
from datetime import datetime, timezone


def generate_reference_code() -> str:
    """Generates a human-shareable reference code like CM-20260822-7F3K9Q."""
    date_part = datetime.now(timezone.utc).strftime("%Y%m%d")
    rand_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"CM-{date_part}-{rand_part}"
