import os
from typing import Annotated
import uvicorn
from fastapi import FastAPI, HTTPException, Header
from starlette.middleware.cors import CORSMiddleware
from work_with_DB.GetFromBD import getFromDBlogin, get_subjects, get_all_achievements, get_all_my_teachers
from createJWT import create_access_token, decode_token
from Models.models import Login

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def ret_pin():
    return {"message": "We are in work"}


@app.post("/login")
async def log(login: Login):
    response = await getFromDBlogin(login)
    print(response)
    if response is False:
        raise HTTPException(status_code=404, detail="No such user")
    else:
        token = response.copy()
        token.update({"role": "student"})
        response["token"] = create_access_token(token)
        return response


@app.get("/subjects")
async def get_subj(authorization: Annotated[str | None, Header()] = None):
    id = decode_token(token=authorization)["id"]
    response = await get_subjects(id)
    if response:
        return response
    raise HTTPException(status_code=404, detail="No data about this user")


@app.get("/achievements")
async def get_achievements(authorization: Annotated[str | None, Header()] = None):
    id = decode_token(token=authorization)["id"]
    response = await get_all_achievements(id)
    if response:
        return response
    raise HTTPException(status_code=404, detail="This user has no achievements")


@app.get("/teachers")
async def get_my_teachers(authorization: Annotated[str | None, Header()] = None):
    id = decode_token(token=authorization)["id"]
    response = await get_all_my_teachers(id)
    if response:
        return response
    raise HTTPException(status_code=404, detail="This user has no teachers")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
