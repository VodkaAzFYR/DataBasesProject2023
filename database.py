import pyodbc
from datetime import timedelta


database_set_string = ("Driver={ODBC Driver 17 for SQL Server};"
                            "Server=localhost;"
                            "Database=LessonPlan;"
                            "Trusted_Connection=yes;")


def select_lessons_data(date, class_name):
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    rounded_date = date.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    cur.execute(f"""SELECT S.SubjectName, T.TeacherName, T.TeacherLastname, CONVERT(NVARCHAR(50), L.StartLesson), CONVERT(NVARCHAR(50), L.EndLesson) from [dbo].[Lesson] L JOIN [dbo].[Class] C ON L.ClassId = C.Id
                     JOIN [dbo].[Subject] S ON L.SubjectId = S.Id
                     JOIN [dbo].[Teacher] T ON L.TeacherId = T.Id WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, L.LessonDate)) = '{rounded_date}' AND C.ClassName = '{class_name}'""")
    data = cur.fetchall()
    connect.close()
    return data

def input_teacher_data(teacher_name, teacher_lastname):
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""INSERT INTO Teacher(TeacherName, TeacherLastname)
                        VALUES ('{teacher_name}', '{teacher_lastname}')""")
    connect.commit()
    connect.close()
    return True

def input_class_data(class_name):
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""INSERT INTO Class(ClassName)
                    VALUES ('{class_name}')""")
    connect.commit()
    connect.close()
    return True

def input_lesson_data(class_name, subject_name, teacher_name, teacher_lastname, start_lesson, end_lesson,
                      lesson_date):
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""INSERT INTO Lesson(ClassId, SubjectId, TeacherId, StartLesson, EndLesson, LessonDate)
                VALUES ((SELECT Id FROM Class WHERE ClassName = '{class_name}'), 
                (SELECT Id FROM [Subject] WHERE SubjectName = '{subject_name}'), 
                (SELECT Id FROM Teacher WHERE TeacherName = '{teacher_name}' AND TeacherLastname = '{teacher_lastname}'), 
                '{start_lesson}', '{end_lesson}', '{lesson_date}')""")
    connect.commit()
    connect.close()
    return True

def select_all_teachers():
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""SELECT TeacherName, TeacherLastname FROM [dbo].[Teacher]""")
    data = cur.fetchall()
    connect.close()
    return data

def select_all_classes():
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""SELECT ClassName FROM [dbo].[Class]""")
    data = cur.fetchall()
    connect.close()
    return data

def select_all_subjects():
    connect = pyodbc.connect(database_set_string)
    cur = connect.cursor()
    cur.execute(f"""SELECT SubjectName FROM [dbo].[Subject]""")
    data = cur.fetchall()
    connect.close()
    return data
