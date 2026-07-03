import jwt

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .models import Users


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        #print(request.headers)
        auth_header = request.headers.get("Authorization")
        #print("Authorization:", auth_header)

        if not auth_header:
            return None

        if auth_header == "Bearer null" or auth_header == "Bearer undefined":
            return None

        try:
            token_type, token = auth_header.split(" ")

            if token_type != "Bearer":
                return None

            payload = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=[settings.JWT_ALGORITHM]
            )

            user = Users.objects.get(id=payload["user_id"])

            return (user, token)

        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        except Users.DoesNotExist:
            return None
        except ValueError:
            return None