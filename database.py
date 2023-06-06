import pyodbc
from datetime import timedelta

class DataBase:
    def __init__(self):
        self.database_set_string = ("Driver={ODBC Driver 17 for SQL Server};"
                                    "Server=localhost;"
                                    "Database=LessonPlan;"
                                    "Trusted_Connection=yes;")

        self.connect = pyodbc.connect(self.database_set_string)
        self.cur = self.connect.cursor()

    def select_lessons_data(self, date, class_name):
        rounded_date = date.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        self.cur.execute(f"""SELECT S.SubjectName, T.TeacherName, T.TeacherLastname, CONVERT(NVARCHAR(50), L.StartLesson), CONVERT(NVARCHAR(50), L.EndLesson) from [dbo].[Lesson] L JOIN [dbo].[Class] C ON L.ClassId = C.Id
                         JOIN [dbo].[Subject] S ON L.SubjectId = S.Id
                         JOIN [dbo].[Teacher] T ON L.TeacherId = T.Id WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, L.LessonDate)) = '{rounded_date}' AND C.ClassName = '{class_name}'""")
        data = self.cur.fetchall()
        return data


