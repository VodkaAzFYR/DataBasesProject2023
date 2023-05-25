USE [master]
GO

DROP DATABASE IF EXISTS [LessonPlan]
GO

CREATE DATABASE [LessonPlan]
GO

USE [LessonPlan]
GO

CREATE TABLE [Subject](
	Id INT IDENTITY(1, 1),
	SubjectName NVARCHAR(100) NOT NULL,
	SubjectDescription NVARCHAR(255) NULL,
	CONSTRAINT PK_Subject_Id PRIMARY KEY (Id)
)
CREATE TABLE Teacher(
	Id INT IDENTITY(1, 1),
	TeacherName NVARCHAR(50) NOT NULL,
	TeacherLastname NVARCHAR(50) NOT NULL,
	TeacherPhoneNumber NVARCHAR(9) CHECK(LEN(TeacherPhoneNumber) = 9) NULL,
	CONSTRAINT PK_Teacher_Id PRIMARY KEY (Id)
)
CREATE TABLE Class(
	Id INT IDENTITY(1, 1),
	ClassName NVARCHAR(50) NOT NULL,
	BirthYear DATE NOT NULL,
	CONSTRAINT PK_Class_Id PRIMARY KEY (Id)
)
CREATE TABLE Classroom(
	Id INT IDENTITY(1, 1),
	ClassroomNumber INT NOT NULL,
	ClassroomQuantity INT NULL,
	CONSTRAINT PK_Classroom_Id PRIMARY KEY (Id)
)
CREATE TABLE LessonPlan(
	Id INT IDENTITY(1, 1),
	ClassId INT NOT NULL,
	SubjectId INT NOT NULL,
	TeacherId INT NOT NULL,
	ClassroomId INT NOT NULL,
	StartLessonTime TIME NOT NULL,
	EndLessonTime TIME NOT NULL,
	CONSTRAINT PK_LessonPlan_Id PRIMARY KEY (Id),
	CONSTRAINT FK_LessonPlan_ClassId FOREIGN KEY (ClassId) REFERENCES Class(Id),
	CONSTRAINT FK_LessonPlan_SubjectId FOREIGN KEY (SubjectId) REFERENCES [Subject](Id),
	CONSTRAINT FK_LessonPlan_TeacherId FOREIGN KEY (TeacherId) REFERENCES Teacher(Id),
	CONSTRAINT FK_LessonPlan_ClassroomId FOREIGN KEY (ClassroomId) REFERENCES Classroom(Id)
)
