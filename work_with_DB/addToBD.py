import psycopg2
from work_with_DB.conn import connection


async def add_register(reg):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''INSERT INTO users (fio, "group", email, password) VALUES 
        (%s, %s, %s, %s)''', (reg.fio, reg.group, reg.email, reg.password))
        cur.commit()
        return True
    except (Exception, psycopg2.Error) as error:
        return {"Error": error}
    finally:
        conn.close()
        cur.close()
