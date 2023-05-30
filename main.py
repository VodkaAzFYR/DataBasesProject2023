from fastapi import FastAPI
import os
import pyodbc

connection_string = ("Driver={ODBC Driver 17 for SQL Server};"
                    "Server= localhost;"
                    "Database=LessonPlan;"
                    "Trusted_Connection=yes;")
cnxn = pyodbc.connect(connection_string)
cursor = cnxn.cursor()
cursor.execute("SELECT * FROM Teacher")
row = cursor.fetchall()
print(row)
app = FastAPI()
@app.get("/")
def root():
    return {"Hey"}

if __name__ == "__main__":
    os.system("python -m uvicorn main:app --reload")  #--host 0.0.0.0