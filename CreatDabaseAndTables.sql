USE [master]
GO

DROP DATABASE IF EXISTS [LessonPlan]
GO

CREATE DATABASE [LessonPlan]
GO

USE [LessonPlan]
GO
CREATE TABLE Class(
	Id INT IDENTITY(1, 1),
	StudentId INT NOT NULL,
	ClassroomId INT NOT NULL,
	ClassName NVARCHAR(50) NOT NULL,
	BirthYear DATE NOT NULL,
	CONSTRAINT PK_Class_Id PRIMARY KEY (Id)
)
CREATE TABLE Teacher(
	Id INT IDENTITY(1, 1),
	ClassId INT NOT NULL,
	ClassroomId INT NOT NULL,
	TeacherName NVARCHAR(50) NOT NULL,
	TeacherLastname NVARCHAR(50) NOT NULL,
	TeacherPhoneNumber NVARCHAR(20) CHECK(LEN(TeacherPhoneNumber) > 9) NULL,
	CONSTRAINT PK_Teacher_Id PRIMARY KEY (Id)
)

CREATE TABLE [Subject](
	Id INT IDENTITY(1, 1),
	SubjectName NVARCHAR(100) NOT NULL,
	SubjectDescription NVARCHAR(255) NULL,
	CONSTRAINT PK_Subject_Id PRIMARY KEY (Id)
)
CREATE TABLE Classroom(
	Id INT IDENTITY(1, 1),
	ClassId INT NOT NULL,
	ClassroomNumber INT NOT NULL,
	ClassroomQuantity INT NULL,
	CONSTRAINT PK_Classroom_Id PRIMARY KEY (Id)
)
CREATE TABLE Student(
	Id INT IDENTITY(1, 1),
	StudentName NVARCHAR(50),
	StudentLastname NVARCHAR(50),
	StudentPhone NVARCHAR(20) CHECK(LEN(StudentPhone) > 9) NULL,
	CONSTRAINT PK_Student_Id PRIMARY KEY (Id)
)
CREATE TABLE SubjectTeacher(
	Id INT IDENTITY(1, 1),
	SubjectId INT NOT NULL,
	TeacherId INT NOT NULL,
	CONSTRAINT PK_SubjectTeacher_Id PRIMARY KEY (Id),
	CONSTRAINT FK_SubjectTeacher_SubjectId FOREIGN KEY (SubjectId) REFERENCES [Subject](Id),
	CONSTRAINT FK_SubjectTeacher_TeacherId FOREIGN KEY (TeacherId) REFERENCES Teacher(Id)
)
CREATE TABLE SubjectClass(
	Id INT IDENTITY(1, 1),
	SubjectId INT NOT NULL,
	ClassId INT NOT NULL,
	CONSTRAINT PK_SubjectClass_Id PRIMARY KEY (Id),
	CONSTRAINT FK_SubjectClass_SubjectId FOREIGN KEY (SubjectId) REFERENCES [Subject](Id),
	CONSTRAINT FK_SubjectClass_ClassId FOREIGN KEY (ClassId) REFERENCES Class(Id)
)

ALTER TABLE Class
ADD CONSTRAINT FK_Class_ClassroomId FOREIGN KEY (ClassroomId) REFERENCES Classroom(Id)

ALTER TABLE Class
ADD CONSTRAINT FK_Class_StudentId FOREIGN KEY (StudentId) REFERENCES Student(Id)

ALTER TABLE Classroom
ADD CONSTRAINT FK_Classroom_ClassId FOREIGN KEY (ClassId) REFERENCES Class(Id)

ALTER TABLE Teacher
ADD CONSTRAINT FK_Teacher_ClassId FOREIGN KEY (ClassId) REFERENCES Class(Id)

ALTER TABLE Teacher
ADD CONSTRAINT FK_Teacher_ClassroomId FOREIGN KEY (ClassroomId) REFERENCES Classroom(Id)

