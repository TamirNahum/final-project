USE [master]
GO
/****** Object:  Database [CarRentDB]    Script Date: 13/09/2018 11:39:57 ******/
CREATE DATABASE [CarRentDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarRentDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\CarRentDB.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'CarRentDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\CarRentDB_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [CarRentDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarRentDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarRentDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarRentDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarRentDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarRentDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarRentDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarRentDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [CarRentDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarRentDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarRentDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarRentDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarRentDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarRentDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarRentDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarRentDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarRentDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [CarRentDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarRentDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarRentDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarRentDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarRentDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarRentDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarRentDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarRentDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CarRentDB] SET  MULTI_USER 
GO
ALTER DATABASE [CarRentDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarRentDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarRentDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarRentDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [CarRentDB] SET DELAYED_DURABILITY = DISABLED 
GO
USE [CarRentDB]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 13/09/2018 11:39:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchId] [int] IDENTITY(1,1) NOT NULL,
	[BranchName] [nvarchar](50) NOT NULL,
	[Adrress] [nvarchar](150) NOT NULL,
	[Latitude] [decimal](18, 0) NOT NULL,
	[Longitude] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cars]    Script Date: 13/09/2018 11:39:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarId] [int] IDENTITY(1,1) NOT NULL,
	[CarType] [int] NOT NULL,
	[CarNumber] [nvarchar](12) NOT NULL,
	[kilometerage] [int] NOT NULL,
	[IsProperForRent] [bit] NOT NULL,
	[AvailableAtBranch] [int] NOT NULL,
	[Image] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_CarId] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CarTypes]    Script Date: 13/09/2018 11:39:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarTypes](
	[CarTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](100) NOT NULL,
	[Model] [nvarchar](150) NOT NULL,
	[DailyCost] [money] NOT NULL,
	[DayOverdueCost] [money] NOT NULL,
	[ManufacturYear] [smallint] NOT NULL,
	[IsManual] [bit] NOT NULL,
 CONSTRAINT [PK_CarTypes] PRIMARY KEY CLUSTERED 
(
	[CarTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Orders]    Script Date: 13/09/2018 11:39:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[StartRentDate] [date] NOT NULL,
	[ReturnDate] [date] NULL,
	[EndOfRentDate] [date] NOT NULL,
	[UserId] [int] NOT NULL,
	[CarId] [int] NOT NULL,
 CONSTRAINT [PK_OrderId] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 13/09/2018 11:39:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](70) NOT NULL,
	[IdNumber] [nvarchar](9) NOT NULL,
	[UserName] [nvarchar](10) NOT NULL,
	[BirthDate] [date] NULL,
	[IsMale] [bit] NOT NULL,
	[Email] [nvarchar](60) NOT NULL,
	[Password] [nvarchar](10) NOT NULL,
	[UserRole] [tinyint] NOT NULL,
	[Image] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_SearchResults] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchId], [BranchName], [Adrress], [Latitude], [Longitude]) VALUES (1, N'CarRentJerusalem', N'HaAoman 1', CAST(159844336 AS Decimal(18, 0)), CAST(336494511 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[Branches] OFF
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarId], [CarType], [CarNumber], [kilometerage], [IsProperForRent], [AvailableAtBranch], [Image]) VALUES (21, 1, N'1234569', 369852, 1, 1, N'CarImages/1234569.jpg')
INSERT [dbo].[Cars] ([CarId], [CarType], [CarNumber], [kilometerage], [IsProperForRent], [AvailableAtBranch], [Image]) VALUES (22, 3, N'9865741', 35000, 1, 1, N'CarImages/9865741.jpg')
INSERT [dbo].[Cars] ([CarId], [CarType], [CarNumber], [kilometerage], [IsProperForRent], [AvailableAtBranch], [Image]) VALUES (23, 7, N'98756321', 40000, 1, 1, N'CarImages/98756321.jpg')
INSERT [dbo].[Cars] ([CarId], [CarType], [CarNumber], [kilometerage], [IsProperForRent], [AvailableAtBranch], [Image]) VALUES (24, 6, N'9865321', 30000, 1, 1, N'CarImages/9865321.jpg')
INSERT [dbo].[Cars] ([CarId], [CarType], [CarNumber], [kilometerage], [IsProperForRent], [AvailableAtBranch], [Image]) VALUES (25, 5, N'3658974', 33665, 1, 1, N'CarImages/3658974.jpg')
SET IDENTITY_INSERT [dbo].[Cars] OFF
SET IDENTITY_INSERT [dbo].[CarTypes] ON 

INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (1, N'BMW', N'M140i', 750.0000, 900.0000, 2017, 1)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (3, N'MaZDA', N'CX-5', 530.0000, 620.0000, 2018, 0)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (5, N'Toyota', N'Auris', 270.0000, 330.0000, 2014, 0)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (6, N'KIA', N'Forte', 300.0000, 350.0000, 2015, 0)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (7, N'Hyundai', N'i10', 230.0000, 310.0000, 2010, 0)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (8, N'BMW', N'X4', 660.0000, 700.0000, 2017, 0)
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [DailyCost], [DayOverdueCost], [ManufacturYear], [IsManual]) VALUES (9, N'KIA', N'Carens', 200.0000, 235.0000, 2017, 1)
SET IDENTITY_INSERT [dbo].[CarTypes] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (31, CAST(N'2018-09-12' AS Date), CAST(N'2018-09-14' AS Date), CAST(N'2018-09-14' AS Date), 37, 22)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (32, CAST(N'2018-09-13' AS Date), NULL, CAST(N'2018-09-22' AS Date), 36, 21)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (33, CAST(N'2018-09-27' AS Date), NULL, CAST(N'2018-09-29' AS Date), 35, 25)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (34, CAST(N'2018-09-29' AS Date), NULL, CAST(N'2018-09-30' AS Date), 33, 24)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (35, CAST(N'2018-09-01' AS Date), CAST(N'2018-09-10' AS Date), CAST(N'2018-09-05' AS Date), 34, 23)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (36, CAST(N'2018-09-07' AS Date), CAST(N'2018-09-09' AS Date), CAST(N'2018-09-08' AS Date), 34, 21)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (38, CAST(N'2018-09-01' AS Date), CAST(N'2018-09-06' AS Date), CAST(N'2018-09-06' AS Date), 38, 24)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (39, CAST(N'2018-09-13' AS Date), CAST(N'2018-09-14' AS Date), CAST(N'2018-09-14' AS Date), 33, 24)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (40, CAST(N'2018-09-15' AS Date), CAST(N'2018-09-15' AS Date), CAST(N'2018-09-15' AS Date), 38, 22)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (41, CAST(N'2018-09-20' AS Date), NULL, CAST(N'2018-09-22' AS Date), 38, 24)
INSERT [dbo].[Orders] ([OrderId], [StartRentDate], [ReturnDate], [EndOfRentDate], [UserId], [CarId]) VALUES (48, CAST(N'2018-09-27' AS Date), NULL, CAST(N'2018-09-29' AS Date), 3, 22)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (3, N'tamir', N'145789653', N'tamir1111', CAST(N'2018-09-07' AS Date), 1, N'tamirn670@gmail.com', N'123123', 1, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (33, N'Bob Cohen', N'123123123', N'Bob123', CAST(N'1993-03-20' AS Date), 1, N'Bob@gmail.com', N'123123', 2, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (34, N'Alice Levi', N'123456789', N'Alice123', CAST(N'1990-12-05' AS Date), 0, N'Alice@gmail.com', N'123456', 2, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (35, N'Jhon Bryce', N'231456789', N'Jhonny', CAST(N'2007-06-16' AS Date), 1, N'Jhon@gmail.com', N'123456', 3, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (36, N'Tamir Nahum', N'123987582', N'Tamir123', NULL, 1, N'Tamir@gmail.com', N'123456', 3, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (37, N'omer cohen', N'387123658', N'omer123', CAST(N'2018-09-13' AS Date), 1, N'Omer@gmail.com', N'123456', 3, N'UserImages/default-user.jpg')
INSERT [dbo].[Users] ([UserId], [FullName], [IdNumber], [UserName], [BirthDate], [IsMale], [Email], [Password], [UserRole], [Image]) VALUES (38, N'stav levi', N'654823711', N'stav123', CAST(N'2000-09-05' AS Date), 0, N'stav@gmail.com', N'123456', 3, N'UserImages/default-user.jpg')
SET IDENTITY_INSERT [dbo].[Users] OFF
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ__Users__C9F284560F4D7E88]    Script Date: 13/09/2018 11:39:57 ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Branches] FOREIGN KEY([AvailableAtBranch])
REFERENCES [dbo].[Branches] ([BranchId])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Branches]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarTypes] FOREIGN KEY([CarType])
REFERENCES [dbo].[CarTypes] ([CarTypeId])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarTypes]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Cars] FOREIGN KEY([CarId])
REFERENCES [dbo].[Cars] ([CarId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Cars]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
USE [master]
GO
ALTER DATABASE [CarRentDB] SET  READ_WRITE 
GO
