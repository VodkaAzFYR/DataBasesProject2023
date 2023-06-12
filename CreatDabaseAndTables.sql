--USE [master]
--GO

--DROP DATABASE IF EXISTS [LessonPlan]
--GO

--CREATE DATABASE [LessonPlan]
--GO

--USE [LessonPlan]
--GO

--CREATE TABLE Class(
--	Id INT IDENTITY(1, 1),
--	ClassName NVARCHAR(50) NOT NULL,
--	CONSTRAINT PK_Class_Id PRIMARY KEY (Id)
--)
--CREATE TABLE [Subject](
--	Id INT IDENTITY(1, 1),
--	SubjectName NVARCHAR(50) NOT NULL,
--	CONSTRAINT PK_Subject_Id PRIMARY KEY (Id)
--)
--CREATE TABLE Teacher(
--	Id INT IDENTITY(1, 1),
--	TeacherName NVARCHAR(50) NOT NULL,
--	TeacherLastname NVARCHAR(50) NOT NULL,
--	CONSTRAINT PK_Teacher_Id PRIMARY KEY (Id)
--)
--CREATE TABLE Lesson(
--	Id INT IDENTITY(1, 1),
--	ClassId INT NOT NULL,
--	SubjectId INT NOT NULL,
--	TeacherId INT NOT NULL,
--	StartLesson TIME NOT NULL,
--	EndLesson TIME NOT NULL,
--	LessonDate DATETIME NOT NULL,
--	CONSTRAINT FK_Lesson_ClassId FOREIGN KEY (ClassId) REFERENCES Class (Id),
--    CONSTRAINT FK_Lesson_SubjectId FOREIGN KEY (SubjectId) REFERENCES Subject (Id),
--    CONSTRAINT FK_Lesson_TeacherId FOREIGN KEY (TeacherId) REFERENCES Teacher (Id) 
--)

--INSERT INTO Class(ClassName)
--VALUES ('1a')
--INSERT INTO Subject(SubjectName)
--VALUES ('Fizyka')
--INSERT INTO Teacher(TeacherName, TeacherLastname)
--VALUES ('Mateusz', 'Koz³owski')

--INSERT INTO Lesson(ClassId, SubjectId, TeacherId, StartLesson, EndLesson, LessonDate)
--VALUES ((SELECT Id FROM Class WHERE ClassName = '1a'), (SELECT Id FROM [Subject] WHERE SubjectName = 'Fizyka'), (SELECT Id FROM Teacher WHERE TeacherName = 'Mateusz' AND TeacherLastname = 'Koz³owski'), '11:00', '11:45', '2023-06-09')


SELECT * FROM Lesson