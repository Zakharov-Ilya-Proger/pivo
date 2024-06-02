from fastapi import FastAPI, HTTPException

from work_with_DB.GetFromBD import getFromDBlogin
from createJWT import create_access_token
from Models.models import Login

app = FastAPI()


@app.post("/login")
async def log(login: Login):
    response = await getFromDBlogin(login)
    if response is False:
        raise HTTPException(status_code=404, detail="No such user")
    else:
        token = dict(response.copy())
        token["role"] = "student"
        resp_token = create_access_token(token)
        return {"data": response, "token": resp_token}

