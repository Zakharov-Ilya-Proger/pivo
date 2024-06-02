from Models.models import Login
import psycopg2
from conn import connection


async def getFromDBlogin(login: Login):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute(f'SELECT fio, "group" FROM users WHERE email = {login.email} AND password = {login.password}')
        data = cur.fetchone()
        if data is None:
            return False
        return {"fio": data[0], "group": data[1]}
    except (Exception, psycopg2.Error) as error:
        return {"Error": error}
    finally:
        cur.close()
        conn.close()
