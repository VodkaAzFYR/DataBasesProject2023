from fastapi import FastAPI
import os
from database import DataBase
from datetime import datetime

app = FastAPI()
@app.get("/")
def root():
    return {"status": "ready"}


@app.get("/get_lessons_plan")
def get_lessons_plan(date, class_name):
    datetime_date = datetime.strptime(date, f"%d-%m-%Y")
    db = DataBase()
    data = db.select_lessons_data(date=datetime_date, class_name=class_name)
    return f"{data}"
if __name__ == "__main__":
    os.system("python -m uvicorn main:app --reload")  #--host 0.0.0.0