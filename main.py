from fastapi import FastAPI
from database import DataBase
from datetime import datetime
import os

app = FastAPI()
db = DataBase()


@app.get("/")
def root():
    return {"status": "ready"}


@app.get("/get_subjects")
def get_subjects():
    subjects = db.select_all_subjects()
    subjects_list = [f"{i[0]}" for i in subjects]
    return str(subjects_list)


@app.get("/get_classes")
def get_teachers():
    classes = db.select_all_classes()
    classes_list = [f"{i[0]}" for i in classes]
    return classes_list


@app.get("/get_lessons_plan")
def get_lessons_plan(date, class_name):
    datetime_date = datetime.strptime(date, f"%d-%m-%Y")
    data = db.select_lessons_data(date=datetime_date, class_name=class_name)
    return f"{data}"


# @app.post("/input_lessons_plan")
# def input_lessons_plan(class_name, subject_name, teacher_name, teacher_lastname, start_lesson, end_lesson, lesson_date):
@app.get("/get_teachers")
def get_teachers():
    teachers = db.select_all_teachers()
    teachers_list = [f"{i[0]} {i[1]}" for i in teachers]
    return str(teachers_list)


@app.post("/add_teacher")
def add_teacher(teacher_name, teacher_lastname):
    db.input_teacher_data(teacher_name=teacher_name, teacher_lastname=teacher_lastname)
    return {"status": "ok"}


@app.post("/add_class")
def add_class(class_name):
    db.input_class_data(class_name=class_name.lower())
    return {"status": "ok"}


# [1b, Matematyka, Mateusz, Kozłowski, 06-06-2023, 8.30, 9,30]

@app.post("/add_lessons")
def add_lessons(class_name, subject_name, teacher_name, teacher_lastname, lesson_date, start_lesson, end_lesson):
    db.input_lesson_data(class_name=class_name, subject_name=subject_name, teacher_name=teacher_name,
                         teacher_lastname=teacher_lastname,
                         lesson_date=lesson_date, start_lesson=start_lesson, end_lesson=end_lesson)
    return {"status": "ok"}


if __name__ == "__main__":
    os.system("python -m uvicorn main:app --reload")  # --host 0.0.0.0
