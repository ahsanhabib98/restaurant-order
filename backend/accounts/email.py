import logging
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)

EMAIL_HOST_USER = getattr(settings, "EMAIL_HOST_USER", None)
SITE_DOMAIN = getattr(settings, "SITE_DOMAIN", None)


def invites_email(owner_user_id, token):
    if EMAIL_HOST_USER is None or SITE_DOMAIN is None:
        return
    fromaddr = EMAIL_HOST_USER

    from .models import UserInvitation

    user = get_user_model().objects.get(id=owner_user_id)
    invites_obj = UserInvitation.objects.get(token=token)

    toaddr = invites_obj.email

    subject = f"Invitation from {user.company} dashboard."

    full_name = f"{user}"

    link = f"{SITE_DOMAIN}/invitation/{token}/"
    body = f"""
        <p>Hello,</p>
        <p>You are invited to join onno dashboard as a manager by {full_name}.</p>
        <p>To login to {SITE_DOMAIN}/ if already have a account.</p>
        <p>
            Link: <a href="{link}">Join Now</a>
        </p>
        <br>
        <p>Thanks</p>
    """
    email = EmailMessage(subject, body, fromaddr, [toaddr])
    email.content_subtype = "html"
    email.send()
