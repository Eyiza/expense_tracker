import json
from flask import request, _request_ctx_stack, abort, session
from functools import wraps
from urllib.request import urlopen
from flask import redirect, request, session
from functools import wraps

## AuthError Exception
'''
AuthError Exception
A standardized way to communicate auth failure modes
'''
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            session.clear()
            # return redirect("/login")
            raise AuthError({
                'code': 'unauthorized',
                'description': 'User is not logged in'
            }, 401)
        return f(*args, **kwargs)
    return decorated_function