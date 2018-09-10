USE [master] 
GO

CREATE DATABASE [CarRentDB]  
GO


USE [CarRentDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](70) NOT NULL,
	[IdNumber] [nvarchar](9) NOT NULL,
	[UserName] [nvarchar](10) NOT NULL UNIQUE,
	[BirthDate] [DATE],
	[IsMale] [bit] NOT NULL,
	[Email] [nvarchar](60 ) NOT NULL,
	[Password] [nvarchar](10) NOT NULL,
	[UserRole] [tinyint] NOT NULL,
	[Image] [nvarchar](max) ,
 CONSTRAINT [PK_SearchResults] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


CREATE TABLE [dbo].[Branches](
	[BranchId] [int] IDENTITY(1,1) NOT NULL,
	[BranchName] [nvarchar](50) NOT NULL,
	[Adrress] [nvarchar](150) NOT NULL,
	[Latitude] [decimal] NOT NULL,
	[Longitude] [decimal] NOT NULL ,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


CREATE TABLE [dbo].[CarTypes](
	[CarTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](100) NOT NULL,
	[Model] [nvarchar](150) NOT NULL,
	[DailyCost] [money] NOT NULL,
	[DayOverdueCost] [money] NOT NULL ,
	[ManufacturYear] [smallint] NOT NULL ,
	[IsManual] [bit] NOT NULL ,
 CONSTRAINT [PK_CarTypes] PRIMARY KEY CLUSTERED 
(
	[CarTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


CREATE TABLE [dbo].[Cars](
	[CarId] [int] IDENTITY(1,1) NOT NULL,
	[CarType] [int] NOT NULL,
	[CarNumber] [nvarchar](12) NOT NULL ,
	[kilometerage] [int] NOT NULL,
	[IsProperForRent] [bit] NOT NULL,
	[AvailableAtBranch] [int] NOT NULL ,
	[Image] [nvarchar](max) ,
 CONSTRAINT [PK_CarId] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarTypes] FOREIGN KEY([CarType])
REFERENCES [dbo].[CarTypes] (CarTypeId)
GO

ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarTypes]
GO

ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Branches] FOREIGN KEY([AvailableAtBranch])
REFERENCES [dbo].[Branches] (BranchId)
GO

ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Branches]
GO


CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[StartRentDate] [DATE] NOT NULL,
	[ReturnDate] [DATE]  ,
	[EndOfRentDate] [DATE] NOT NULL,
	[UserId] [int] NOT NULL,
	[CarId] [int] NOT NULL ,
 CONSTRAINT [PK_OrderId] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] (UserId)
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Cars] FOREIGN KEY([CarId])
REFERENCES [dbo].[Cars] (CarId)
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Cars]
GO