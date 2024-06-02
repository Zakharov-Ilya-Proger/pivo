import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

SECRET_KEY = "porapitpivo"
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta = None):
    copy_data = data.copy()
    if datetime.now().hour >= 22:
        expire = datetime.combine(datetime.today() + timedelta(days=1), datetime.min.time()) + timedelta(hours=6)
    else:
        expire = datetime.combine(datetime.today(), datetime.min.time()) + timedelta(hours=22)
    if expires_delta:
        expire = datetime.now() + expires_delta
    copy_data.update({"exp": expire})
    return jwt.encode(copy_data, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str = Depends(OAuth2PasswordBearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")