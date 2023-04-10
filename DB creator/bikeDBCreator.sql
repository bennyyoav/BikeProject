---close all user conection   to db except my connection
SET NOCOUNT ON;
USE master;
GO
ALTER DATABASE BikeDB 
SET SINGLE_USER 
WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE BikeDB;
------------------------------------------

-- Create a new database called 'BikeDB'
-- Connect to the 'master' database to run this snippet
USE master
GO


-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'BikeDB'
)
CREATE DATABASE BikeDB;
GO


USE BikeDB;
GO


/*------------   Drop all tables   --------------*/

-- Drop a table called 'VotesAndResponsesBikes' in schema 'dbo'
--    only if it already exists
IF OBJECT_ID('[dbo].[VotesAndResponsesBikes', 'U') IS NOT NULL
DROP TABLE [dbo].[VotesAndResponsesBikes]
GO

IF OBJECT_ID('[dbo].[VotesAndResponsesTrails]', 'U') IS NOT NULL
DROP TABLE [dbo].[VotesAndResponsesTrails]
GO  

IF OBJECT_ID('[dbo].[TrailsPictures]', 'U') IS NOT NULL
DROP TABLE [dbo].[TrailsPictures]
GO

IF OBJECT_ID('[dbo].[ BikesPictures ]', 'U') IS NOT NULL
DROP TABLE [dbo].[BikesPictures]
GO

IF OBJECT_ID('[dbo].[Entrance]', 'U') IS NOT NULL
DROP TABLE [dbo].[Entrance]
GO

IF OBJECT_ID('[dbo].[Users ]', 'U') IS NOT NULL
DROP TABLE [dbo].[Users]
GO

/*------------   Create tables   --------------*/

CREATE TABLE Users (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FirstName   varchar(255) NOT NULL,
	LastName    varchar(255) NOT NULL,
	Uaddress    varchar(255) , 
	UserName    varchar(255) NOT NULL, 
	Upassword   varchar(255) NOT NULL,
	imageUrl  varchar(255) NOT NULL,
	score   int
);

CREATE TABLE Entrance
 (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	UserId int FOREIGN KEY REFERENCES dbo.Users(id),
    MacAddress varchar(255) NOT NULL,
    LogInTime DateTime NOT NULL,
	LogOutTime DateTime 
);

CREATE TABLE BikesPictures
 (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    EntranceId int FOREIGN KEY REFERENCES dbo.Users(id),
    BikeName  varchar(255) NOT NULL,
    BikeManufacturer   varchar(255)NOT NULL,
	PathToPicture  varchar(255) NOT NULL
);

CREATE TABLE  TrailsPictures
 (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    EntranceId int FOREIGN KEY REFERENCES dbo.Users(id),
    TrailName    varchar(255) NOT NULL,
    TrailLevel     varchar(255)NOT NULL,
	PathToPicture  varchar(255) NOT NULL
);

CREATE TABLE  VotesAndResponsesTrails
 (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    entranceId int FOREIGN KEY REFERENCES dbo.Entrance(id),
    TrailId int FOREIGN KEY REFERENCES dbo.TrailsPictures(id),
	Vote int NOT NULL CHECK (Vote>0 AND Vote<6),
	Comment   varchar(5000),
);

CREATE TABLE  VotesAndResponsesBikes
 (
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    entranceId int FOREIGN KEY REFERENCES dbo.Entrance(id),
    BikeId int FOREIGN KEY REFERENCES dbo.BikesPictures(id),
	Vote int NOT NULL CHECK (Vote>0 AND Vote<6),
	Comment   varchar(5000),
	
);

GO

/* ------------------------ Insert Data into Tables -------------------- */

/*----------Users--------------------------------*/
INSERT INTO Users (FirstName,LastName,UserName,uPassword,imageUrl,score)VALUES ('Benny', 'Yoav','Benny',1234,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',100 );
INSERT INTO Users (FirstName,LastName,UserName,uPassword,imageUrl,score)VALUES ('Jhone', 'Joe','Jhone',1234 ,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',70);
INSERT INTO Users (FirstName,LastName,UserName,uPassword,imageUrl,score)VALUES ('Dana', 'Cohen','Dana',1234,'https://thumbs.dreamstime.com/b/hipster-girl-avatar-sunglasses-vector-illustration-design-145430747.jpg',50 );
INSERT INTO Users (FirstName,LastName,UserName,uPassword,imageUrl,score)VALUES ('Dan', 'Levi','Hillel',1234,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',20 );
INSERT INTO Users (FirstName,LastName,UserName,uPassword,imageUrl,score)VALUES ('Yitzhak', 'Bardugo','Yb',1234 ,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',10);
INSERT INTO Users VALUES ('Lucy', 'Mandes','17 Eshel st, Haifa','Am',1234,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png' ,10);
INSERT INTO Users VALUES ('Audi', 'Meir','Raines 5 st, Jerusalem','Am',1234 ,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',10);
INSERT INTO Users VALUES ('Ehud', 'Barak','Harel 18 st, Tel aviv','Pm',1234,'https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png',10 );

/*----------Entrance--------------------------------*/


INSERT INTO Entrance VALUES (3,'70-FF-CC-6A-DD-19','2000-12-01 07:12:33','2000-12-01 08:10:22');
INSERT INTO Entrance VALUES (3,'70-FF-CC-6A-DD-19','2010-12-02 10:15:33','2010-12-02 11:18:24');
INSERT INTO Entrance VALUES (1,'70-FF-CC-6A-DD-19','2015-12-03 20:22:56','2015-12-03 22:00:00');
INSERT INTO Entrance VALUES (1,'70-FF-CC-6A-DD-19','2016-12-04 23:22:56','2016-12-04 23:40:00');
INSERT INTO Entrance VALUES (1,'70-FF-CC-6A-DD-19','2017-12-05 22:22:56','2017-12-05 23:00:00');
INSERT INTO Entrance VALUES (1,'70-FF-CC-6A-DD-19','2018-12-06 06:22:56','2018-12-06 22:00:00');

INSERT INTO Entrance VALUES (2,'70-FF-DD-6A-D1-19','2017-12-01 07:12:33','2017-12-02 08:10:22');
INSERT INTO Entrance VALUES (2,'70-FF-DD-6A-D1-19','2019-12-03 10:15:33','2019-12-03 11:18:24');
INSERT INTO Entrance VALUES (2,'70-FF-DD-6A-D1-22','2023-01-04 20:22:56','2023-01-05 23:59:59');

INSERT INTO Entrance VALUES (3,'70-FF-FF-6A-5E-2D','2022-12-01 09:12:33','2022-12-01 11:10:22');
INSERT INTO Entrance VALUES (3,'70-FF-FF-6A-5E-2D','2019-12-01 11:15:33','2019-12-01 12:18:24');
INSERT INTO Entrance VALUES (3,'70-FF-FF-6A-5E-2D','2023-12-01 20:22:56','2023-12-01 22:00:00');

INSERT INTO Entrance VALUES (4,'33-AF-FF-2A-EE-2D','2022-12-01 09:12:33','2022-12-01 11:10:22');
INSERT INTO Entrance VALUES (4,'33-AF-FF-2A-EE-2D','2019-12-01 11:15:33','2019-12-01 12:18:24');
INSERT INTO Entrance VALUES (4,'33-AF-FF-2A-EE-2D','2023-12-01 20:22:56','2023-12-01 22:40:00');

INSERT INTO Entrance VALUES (5,'33-AF-FF-2A-EE-DD','2010-12-01 09:12:33','2010-12-01 11:10:22');
INSERT INTO Entrance VALUES (5,'33-AF-FF-2A-EE-DD','2011-12-01 11:15:50','2011-12-01 12:18:24');
INSERT INTO Entrance VALUES (5,'33-AF-FF-2A-EE-DD','2012-12-01 20:22:56','2015-12-01 22:22:00');

INSERT INTO Entrance VALUES (6,'33-22-F6-2E-5E-AA','2017-11-06 09:12:33','2017-11-06 11:11:43');

INSERT INTO Entrance VALUES (7,'33-22-F7-2E-EE-AA','2023-11-01 11:12:53','2000-12-01 12:11:45');

INSERT INTO Entrance VALUES (8,'33-22-F7-2E-EE-AA','2010-10-01 11:12:53','2010-10-01 12:13:55');


/*----------BikesPictures--------------------------------*/
	INSERT INTO BikesPictures VALUES (1,'Storm3','Norco',
	'https://cdn.shoplightspeed.com/shops/619643/files/27278164/image.jpg');
	INSERT INTO BikesPictures VALUES (1,'Storm5','Norco',
	'https://s3-ap-southeast-2.amazonaws.com/pv-res-au/PROPERTY/41988/58ac1c2a-2158-4f27-ac87-85af053ee051/whatsapp-image-2021-02-16-at-64208-pm.jpeg')
	INSERT INTO BikesPictures VALUES (8,'Storm7','Norco',
	'https://sportrentals.ca/images/2016-Norco-Storm-7.3.jpg')

	INSERT INTO BikesPictures VALUES (2,'ROCKHOPPER SPORT','Specialized',
	'https://assets.specialized.com/i/specialized/91520-65_ROCKHOPPER-SPORT-29-BLZ-ICEPPYA_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto');
	INSERT INTO BikesPictures VALUES (3,'STUMPJUMPER','Specialized',
	'https://images.immediate.co.uk/production/volatile/sites/21/2022/05/Specialized-Stumpjumper-Comp-01-26ac481.jpg?quality=90&resize=620,413');

	INSERT INTO BikesPictures VALUES (5,'Epic PRO','Specialized',
	'https://assets.specialized.com/i/specialized/97620-10_EPIC-PRO-ABLN-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto')
	INSERT INTO BikesPictures VALUES (8,'Epic Pro18','Specialized',
	'https://fullsus.co.za/wp-content/uploads/2018/04/Credit-images-Etienne-van-Rensburg.jpg')

Go

/*---------- Trails Pictures--------------------------------*/
INSERT INTO TrailsPictures VALUES (1,'Alon HaGalil','medium',
	'https://i.ytimg.com/vi/ZWDdBooFSik/maxresdefault.jpg');
	INSERT INTO TrailsPictures VALUES (4,'Shimshit','easy',
	'https://www.kkl.org.il/bike/files/Trips/2009/2.jpg');
	INSERT INTO TrailsPictures VALUES (6,'Kiryat Ata Forest','easy',
	'https://www.kkl.org.il/bike/files/Trips/Banners/2812.jpg');
	INSERT INTO TrailsPictures VALUES (6,'R Shimon ben Lakish','Hard',
	'https://www.kkl.org.il/bike/files/Trips/1992/10.jpg');


/*---------- VotesAndResponsesTrails--------------------------------*/

INSERT INTO VotesAndResponsesTrails VALUES (7,1,5,'Amazing single ,Lunapark for adults');
INSERT INTO VotesAndResponsesTrails VALUES (1,2,4,'I love this trail');
INSERT INTO VotesAndResponsesTrails VALUES (2,3,5,'Surprising and amazing singel');	
INSERT INTO VotesAndResponsesTrails VALUES (3,4,5,'It was very hard to me, but its is a good sport');	
INSERT INTO VotesAndResponsesTrails (entranceId,TrailId,Vote) VALUES (7,4,2);
INSERT INTO VotesAndResponsesTrails VALUES (8,1,5,'It was very hard to me, but its is a good sport');	
INSERT INTO VotesAndResponsesTrails VALUES (9,2,5,'It was very hard to me, but its is a good sport');	
INSERT INTO VotesAndResponsesTrails VALUES (12,3,5,'It was very hard to me, It has an amazing view');	
INSERT INTO VotesAndResponsesTrails (EntranceId,TrailId,Vote) VALUES (15,4,2);
INSERT INTO VotesAndResponsesTrails (EntranceId,TrailId,Vote,Comment) VALUES (16,1,4,'Not passable to bicycles');
INSERT INTO VotesAndResponsesTrails (EntranceId,TrailId,Vote,Comment) VALUES (17,3,2,'Not for biggner');

/*---------- VotesAndResponsesbikes--------------------------------*/

INSERT INTO VotesAndResponsesBikes VALUES (1,1,5,'The Specialized Stumpjumper Comp shortlisted in the Trail Bike category of our 2022 Bike of the Year awards, is the cheapest carbon Stumpy in the range. There are also two alloy versions available for a chunk less cash.');
INSERT INTO VotesAndResponsesBikes VALUES (1,2,4,'Rockhopper mountain bikes from Specialized are a common sighting on the trail. It is one of the most popular hardtail mountain bikes every year because of the many variations and price points. In this Specialized Rockhopper review I’ll break down the differences between all five models, as well as tire sizes available.
The Specialized Rockhopper weight varies by model due to the weight differences between groupsets. It ranges from as light as 30.2 lbs for the Expert and at 32.7 lbs on the high end for the Expert.');
INSERT INTO VotesAndResponsesBikes VALUES (2,3,5,'Surprising and amazing bikes');	
INSERT INTO VotesAndResponsesBikes VALUES (3,4,5,'If you’ve spent any time on a mountain bike in the past 40 years, there’s a good chance you’ve heard of the Specialized Stumpjumper. Introduced in 1981, it was the first mass-production mountain bike to hit the market, and while the design has changed a lot over the years (the original Stumpy was built with a welded steel frame that lacked suspension and cost $750), the fervor and versatility that gave rise to its success lives on.

Today, the Stumpjumper isn’t one bike, but five—there’s the Alloy, Comp, Expert, Pro and S-Works models to choose from. The entry-level Alloy is the only aluminum frame in the mix, while the other four boast carbon frames. Each model is designed for different riding styles, trail types and budgets, but all maintain the same spirited, adaptable character that makes this ride a benchmark in the mountain bike category. Given its continued success, I rode the budget-friendly Stumpjumper Alloy on a number of popular trails in the Pacific Northwest to reflect on its abilities, and its legacy in a rapidly-evolving space.');	
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (7,4,2);
INSERT INTO VotesAndResponsesBikes VALUES (7,1,5,'It can be easy to get hung up on the potential performance gains and improved ride quality of the latest and greatest bikes. At the top of the sport, you see the best riders winning races aboard the most cutting-edge bikes. Obviously, while much of the successes achieved by these riders are down to raw talent and dedication, it is hard not to be drawn in by the potential gains of having the best mountain bike. But is it worth investing more money when buying a bike to potentially steal a couple of extra seconds here and there?

We’ve reviewed and loved the affordable Stumpjumper Evo Comp Alloy and the high spec Evo Expert Carbon, but is the cheapest carbon-framed option of the Stumpjumper Evo the sweet spot? We’ve been testing it against direct competitors and the Comp Alloy version on a wide range of trails and rides to find out.');	
INSERT INTO VotesAndResponsesBikes VALUES (9,2,3,'The feeling of riding is uncomfortable');	
INSERT INTO VotesAndResponsesBikes VALUES (12,3,5,'Agile and fast bikes despite full suspension');	
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (15,4,1);
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (16,1,3);
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote,Comment) VALUES (18,3,5,'The best purchase I have made. I recommend it to anyone who can afford it');
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (15,6,4)
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (15,5,4)
INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote) VALUES (15,7,4)

	 
GO
/*----------------------CREATE PROCEDUREs---------------------------------------*/
DROP PROCEDURE IF EXISTS dbo.IsUserExist
GO  
CREATE PROCEDURE IsUserExist  @userName varchar(255)
AS
	SET NOCOUNT ON;
	DECLARE @ans int;
	SET @ans=0
	if  (SELECT count( *) from Users where LOWER(Users.UserName) = LOWER(@userName))>0
	SET @ans=1
	SELECT 'ans' = @ans;
Go
/*EXEC IsUserExist "Jhone"*/

/*---------------------------------------------------------------------------*/


DROP PROCEDURE IF EXISTS dbo.CheckPassword
GO  

CREATE PROCEDURE CheckPassword  @userName varchar(255), @password varchar(255)
AS
	SET NOCOUNT ON;
	DECLARE @ans int=0;
	if  (select count( *) from Users where Users.UserName = @userName and
		Users.Upassword=@password)>0
		set @ans=1

	SELECT 'ans' = @ans;
Go
/*EXEC CheckPassword "Jhone", 12345*/
/*---------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dbo.GetUserByUserName 
GO  
CREATE PROCEDURE GetUserByUserName  @userName varchar(255)
AS
  SELECT *
  FROM Users
  where Users.UserName =@userName

Go
/*EXEC GetUserByUserName "Jhone"*/

/*---------------------------------------------------------------------------*/


DROP PROCEDURE IF EXISTS dbo.GetAllUserNames;  
GO  
CREATE PROCEDURE GetAllUserNames
AS
	SET NOCOUNT ON;
	SELECT firstName + ' '+ LastName FROM Users 
GO
/*--EXEC GetAllUserNames;
GO--*/

/*------------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.GetNumberOfUsers;  
GO  
CREATE PROCEDURE GetNumberOfUsers
AS
	DECLARE @usersNum int
	SET @usersNum =  (SELECT COUNT (*) FROM Users )
	SELECT 'usersNum' = @usersNum ;

GO
/*EXEC GetNumberOfUsers;
GO*/
/*------------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.GetAllVotesForBike;  
GO  

CREATE PROCEDURE GetAllVotesForBike @reqBikeId int
AS
	SET NOCOUNT ON;
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,
	VotesAndResponsesBikes.Vote, VotesAndResponsesBikes.Comment,Entrance.LogInTime ,Entrance.id as entranceId
	FROM VotesAndResponsesBikes  INNER JOIN Entrance
	on VotesAndResponsesBikes.entranceId= Entrance.id INNER JOIN Users
	on Entrance.userId= Users.id
	Where @reqBikeId = VotesAndResponsesBikes.BikeId
GO



/*EXEC GetAllVotesForBike @reqBikeId = 1;
GO*/
/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.GetNumberOfVotesForBike;  
GO  
CREATE PROCEDURE GetNumberOfVotesForBike @reqBikeId int
AS
	SET NOCOUNT ON;
	DECLARE @NumberOfVotes int
	SET @NumberOfVotes = 
	(
		SELECT COUNT (*)  as ans
		FROM VotesAndResponsesBikes  INNER JOIN Entrance
		on VotesAndResponsesBikes.entranceId= Entrance.id INNER JOIN Users
		on Entrance.userId= Users.id
		Where @reqBikeId = VotesAndResponsesBikes.BikeId
	)
	SELECT 'NumberOfVote' = @NumberOfVotes ;
	GO
/*EXEC GetNumberOfVotesForBike @reqBikeId = 1;
GO*/
/*--------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dbo.GetNumberOfVotesForTrail;  
GO  
CREATE PROCEDURE GetNumberOfVotesForTrail @reqTrailID int
AS
	SET NOCOUNT ON;
	DECLARE @NumberOfVotes int
	SET @NumberOfVotes = 
	(
		SELECT COUNT (*)  as ans
		FROM VotesAndResponsesTrails  INNER JOIN Entrance
		on VotesAndResponsesTrails.entranceId= Entrance.id INNER JOIN Users
		on Entrance.userId= Users.id
		Where @reqTrailID = VotesAndResponsesTrails.TrailId
	)
	SELECT 'NumberOfVote' = @NumberOfVotes ;
	GO
/*EXEC GetNumberOfVotesForTrail @reqTrailID = 1;
GO*/



/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.GetAllVotesForTrail;  
GO  

CREATE PROCEDURE GetAllVotesForTrail @reqTrailId int
AS
	SET NOCOUNT ON;
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,
	VotesAndResponsesTrails.Vote, VotesAndResponsesTrails.Comment,Entrance.LogInTime ,Entrance.id as entranceId
	FROM VotesAndResponsesTrails  INNER JOIN Entrance
	on VotesAndResponsesTrails.entranceId= Entrance.id INNER JOIN Users
	on Entrance.userId= Users.id
	Where @reqTrailId = VotesAndResponsesTrails.TrailId
GO
/*EXEC GetAllVotesForTrail @reqTrailId=3;
GO--*/
/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.AddUser;  
GO 
CREATE PROCEDURE AddUser
	@firstName   varchar(255),
	@lastName    varchar(255),
	@uAddress    varchar(255) , 
	@userName    varchar(255) , 
	@upassword   varchar(255) ,
	@imageUrl   varchar(255),
	@score int
	
AS
BEGIN--start batch 
      SET NOCOUNT ON;
	  INSERT INTO Users (FirstName,LastName,uAddress,UserName,uPassword,imageUrl,score)
      VALUES (@firstName, @lastName,@uAddress, @userName, @upassword,@imageUrl,	@score )

      SELECT SCOPE_IDENTITY() as userID --returns the last identity value generated for any table in the current session and the current scope
END
GO
/*EXEC AddUser @firstName = 'Noam', @lastName ='Shitrit',@UserName='Ns' ,@uAddress =Null,@Upassword='Nn123456'
GO*/
/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.AddEntrance;  
GO 
CREATE PROCEDURE AddEntrance
	@macAddress   varchar(255),
	@userId int
AS
BEGIN--start batch 
      SET NOCOUNT ON;
	  INSERT INTO Entrance(MacAddress,UserId,LogInTime) 
      VALUES (@macAddress,@userId,GETDATE())-- local time(not UTC)
      SELECT SCOPE_IDENTITY() as EntranceID --returns the last identity value generated for any table in the current session and the current scope
END
GO
EXEC AddEntrance @macAddress='70-FF-CC-6A-DD-19', @userId =1;
GO

/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.AddScoreToUser;  
GO 
CREATE PROCEDURE AddScoreToUser
	@userName varchar(255),
	@score int
AS
	UPDATE dbo.Users
	SET score +=@score 

	WHERE UserName = @userName;
	DECLARE @ans int =1;
	SELECT 'ans' = @ans;/*return always true*/
GO
EXEC AddScoreToUser "Benny",20  ;
Go

/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.AddScoreToUserByUserID;  
GO 
CREATE PROCEDURE AddScoreToUserByUserID
	@userId int,
	@score int
AS
	UPDATE dbo.Users
	SET score +=@score 

	WHERE id = @userId;
	DECLARE @ans int =1;
	SELECT 'ans' = @ans;/*return always true*/
GO
EXEC AddScoreToUserByUserID 1 ,20  ;
Go

/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dbo.UpdateEntranceLogOutTime; --update to current local time  
GO 
CREATE PROCEDURE UpdateEntranceLogOutTime  
	@entranceId int
AS
	SET NOCOUNT ON;
	UPDATE Entrance
	SET LogOutTime= GETDATE()
	WHERE id=@entranceId ;
	SELECT * from  Entrance WHERE id=@entranceId ; 
GO
EXEC UpdateEntranceLogOutTime @entranceId =18;
Go
/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS HasUserVoteToBIke
GO
CREATE PROCEDURE HasUserVoteToBIke
	@userID int,
	@bikeId int
AS
	DECLARE @ans int;
	SET @ans=0
	SET NOCOUNT ON;
	if ((SELECT COUNT (Entrance.UserId)
		FROM VotesAndResponsesBikes INNER JOIN Entrance 
		ON VotesAndResponsesBikes.entranceId = Entrance.id
		WHERE Entrance.UserId = @userID	and VotesAndResponsesBikes.BikeId = @bikeId)>0)
	begin
	SET @ans = 1
	end
	SELECT 'ans' = @ans;
Go

/*---EXEC HasUserVoteToBIke @userID =2, @BikeId=1 
Go--*/
/*--------------------------------------------------------------------------*/	

DROP PROCEDURE IF EXISTS HasUserVoteToTRail
GO
CREATE PROCEDURE HasUserVoteToTRail
	@userID int,
	@trailId int
AS
	DECLARE @ans int;
	SET @ans=0
	SET NOCOUNT ON;
	if ((SELECT COUNT (Entrance.UserId)
		FROM VotesAndResponsesTrails INNER JOIN Entrance 
		ON VotesAndResponsesTrails.entranceId = Entrance.id
		WHERE Entrance.UserId = @userID	and VotesAndResponsesTrails.TrailId = @trailId)>0)/*user vote*/
	begin
	SET @ans = 1
	end
	SELECT 'ans' = @ans;
GO
EXEC HasUserVoteToTRail @userID =2, @trailId = 1
Go
		
/*--------------------------------------------------------------------------*/		
DROP PROCEDURE IF EXISTS GetAverageGradingBike
GO
CREATE PROCEDURE GetAverageGradingBike 
	@reqBikeId int
AS
	SET NOCOUNT ON;
	DECLARE @tempTable table /*recived Table template from  GetAllVotesForBike  */ 
	(
		fullNmae varchar(255),
		Vote int ,
		Comment  varchar(5000),
		LoginTime datetime,
		entranceId int
	)
	INSERT INTO @tempTable  EXEC  GetAllVotesForBike @reqBikeId = @reqBikeId
	SELECT AVG(Vote)  as  bikeAverageGrade from @tempTable
	
Go
EXEC  GetAverageGradingBike @reqBikeId = 7
Go
/*--------------------------------------------------------------------------*/	
DROP PROCEDURE IF EXISTS GetAverageGradingTrail
GO
CREATE PROCEDURE GetAverageGradingTrail 
	@reqTrailId int
AS
	SET NOCOUNT ON;
	DECLARE @tempTable table /*recived Table template from  GetAllVotesForTrail  */ 
	(
		fullNmae varchar(255),
		Vote int ,
		Comment  varchar(5000),
		LoginTime datetime,
		entranceId int
	)
	INSERT INTO @tempTable  EXEC  GetAllVotesForTrail @reqTrailId = @reqTrailId
	SELECT ROUND(AVG(Vote),2,1) as  TrailAverageGrade from @tempTable as  AverageGrade
Go
EXEC  GetAverageGradingTrail @reqTrailId = 4
Go
/*--------------------------------------------------------------------------*/	
DROP PROCEDURE IF EXISTS GetAllActivityOfUser
GO
CREATE PROCEDURE GetAllActivityOfUser @UserId int
AS
	SET NOCOUNT ON;
	DECLARE @tempTable table /*recived Table template from SelectAllVotesForTrail  */ 
	(
		fullNmae varchar(255),
		activity varchar(255) ,
		activity_time  DateTime,
		orderNunber int
	)
	/*Insert Entrance Log In*/
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,'Log In',Entrance.LogInTime,1 
	FROM Users INNER JOIN Entrance 
	on Entrance.UserId = USERS.id
	Where @UserId = Users.id /*In order to arrange the Table at order log in ,voute, log out  */


   /*Insert Upload bikePicture */
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,'Upload bike Picture: ' +BikesPictures.BikeName,Entrance.LogInTime,2 
	FROM Users INNER JOIN Entrance 
	on Entrance.UserId = USERS.id
	INNER JOIN BikesPictures
	on Entrance.id = BikesPictures.EntranceId
	Where @UserId = Users.id /*In order to arrange the Table at order log in ,voute, log out  */

	 /*Insert Upload TrailsPicture */
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,'Upload Trail Picture: ' + TrailsPictures.TrailName,Entrance.LogInTime,2 
	FROM Users INNER JOIN Entrance 
	on Entrance.UserId = USERS.id
	INNER JOIN TrailsPictures
	on Entrance.id = TrailsPictures.EntranceId
	Where @UserId = Users.id /*In order to arrange the Table at order log in ,voute, log out  */

	/*Insert Votes for Bike */
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,
	'Vote For Bike: ' + BikesPictures.BikeName + '  ' + CONVERT(varchar(10), VotesAndResponsesBikes.Vote),
	Entrance.LogInTime,2
	FROM VotesAndResponsesBikes  INNER JOIN Entrance
	on VotesAndResponsesBikes.entranceId= Entrance.id INNER JOIN Users
	on Entrance.userId= Users.id
	INNER JOIN BikesPictures
	on BikesPictures.id = VotesAndResponsesBikes.BikeId
	Where @UserId = Users.id


	
	/*Insert Votes for Trails */
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,
	'Vote Fo Trail: ' + TrailsPictures.TrailName + '  ' + CONVERT(varchar(10), VotesAndResponsesTrails.Vote),
	Entrance.LogInTime,2
	FROM VotesAndResponsesTrails  INNER JOIN Entrance
	on VotesAndResponsesTrails.entranceId= Entrance.id INNER JOIN Users
	on Entrance.userId= Users.id
	INNER JOIN TrailsPictures
	on TrailsPictures.id = VotesAndResponsesTrails.TrailId
	Where @UserId = Users.id
	

	/*Insert Entrance  Log out  */
	INSERT INTO @tempTable
	SELECT  Users.firstName + '  ' + Users.LastName as FullName ,'Log Out',Entrance.LogOutTime,3
	FROM Users INNER JOIN Entrance 
	on Entrance.UserId = USERS.id
	Where (@UserId = Users.id AND Entrance.LogOutTime is NOT NULL )
	
	SELECT fullNmae,activity,FORMAT(activity_time, ' HH:mm  dd-MM-yyyy') as time   FROM @tempTable order by activity_time, orderNunber

GO
 EXEC GetAllActivityOfUser 1;
GO

/*--------------------------------------------------------------------------*/	
DROP PROCEDURE IF EXISTS GetAllBikes
GO
CREATE PROCEDURE GetAllBikes 
AS
SET NOCOUNT ON;

	/*DECLARE @tempTable table /*recived Table te
	mplate from  GetAllVotesForTrail  */ 
	(
		 id int ,
		 name varchar(255) NOT NULL,
		 picture varchar(255) NOT NULL,
    	 manufacturer varchar(255) NOT NULL
		
	)
	INSERT INTO @tempTable   (id,name,Picture,manufacturer)*/
	
	SELECT BikesPictures.id, 
	BikesPictures.BikeName /*as name,*/,
	BikesPictures.PathToPicture /*as Picture*/,
	BikesPictures.BikeManufacturer /*as manufacturer*/,
	BikesPictures.EntranceId
	
	FROM BikesPictures  INNER JOIN Entrance
	on BikesPictures.EntranceId = Entrance.id
	/*select *  from @tempTable*/
GO
EXEC GetAllBikes 
GO
/*--------------------------------------------------------------------------*/	


DROP PROCEDURE IF EXISTS GetBikeByID
GO
CREATE PROCEDURE GetBikeByID 
@reqBikeId int
AS
	SET NOCOUNT ON;


	
	SELECT BikesPictures.id, 
	BikesPictures.BikeName /*as name,*/,
	BikesPictures.PathToPicture /*as Picture*/,
	BikesPictures.BikeManufacturer /*as manufacturer*/,
	BikesPictures.EntranceId
	
	
	FROM BikesPictures
	where @reqBikeId=BikesPictures.id
GO
EXEC GetBikeByID 2
GO


/*--------------------------------------------------------------------------*/	



DROP PROCEDURE IF EXISTS GetTrailByID
GO
CREATE PROCEDURE GetTrailByID 
@reqTrailId int
AS
	SET NOCOUNT ON;


	
	SELECT TrailsPictures.id, 
	TrailsPictures.TrailName /*as name,*/,
	TrailsPictures.PathToPicture /*as Picture*/,
	TrailsPictures.TrailLevel /*as manufacturer*/,
	TrailsPictures.EntranceId
	
	FROM TrailsPictures
	where @reqTrailId=TrailsPictures.id
GO
EXEC GetTrailByID 2
GO


/*--------------------------------------------------------------------------*/	





DROP PROCEDURE IF EXISTS GetUserByEntranceId
GO
CREATE PROCEDURE GetUserByEntranceId 
@entranceId int
AS
	SET NOCOUNT ON;

	
	SELECT Users.UserName,
	Users.imageUrl,
	Users.score
	
	FROM Users 	 RIGHT JOIN Entrance
	on Users.id= Entrance.UserId
	where @entranceId=Entrance.id
	GROUP BY  Users.UserName,Users.imageUrl,Users.score

GO
EXEC GetUserByEntranceId 15
GO




/*-----------------------------------------------------------------------*/




DROP PROCEDURE IF EXISTS GetAllTrials
GO
CREATE PROCEDURE GetAllTrials 
AS
SET NOCOUNT ON;
	SELECT TrailsPictures.id,
	TrailsPictures.TrailName ,
	TrailsPictures.PathToPicture,
	TrailsPictures.TrailLevel,
	TrailsPictures.entranceId

	FROM   TrailsPictures INNER JOIN Entrance
	on TrailsPictures.entranceId = Entrance.id
GO
/*EXEC GetAllTrials 
GO*/
/*--------------------------------------------------------------------------*/	
DROP PROCEDURE IF EXISTS AddVoteAndResponseBike
GO
CREATE PROCEDURE AddVoteAndResponseBike 
		@entranceId  int,
		@BikeId    int,
		@Vote        int, 
		@Comment    varchar(255)
AS	
	
		
	SET NOCOUNT ON;
		  INSERT INTO VotesAndResponsesBikes (entranceId,BikeId,Vote,Comment)
		  VALUES (@entranceId, @BikeId ,@Vote, @Comment)
		  	
		DECLARE @ans int;
		SET @ans = 1
		SELECT 'ans' = @ans;
GO

/*EXEC AddVoteAndResponseBike 2,1,5,'I love this Bikes';
GO*/
/*--------------------------------------------------------------------------*/	
DROP PROCEDURE IF EXISTS AddVoteAndResponseTrial
GO
CREATE PROCEDURE AddVoteAndResponseTrial 
		@entranceId  int,
		@TrailId    int,
		@Vote        int, 
		@Comment    varchar(255)
AS	
	SET NOCOUNT ON;
		  INSERT INTO VotesAndResponsesTrails (entranceId,Trailid,Vote,Comment)
		  VALUES (@entranceId, @TrailId ,@Vote, @Comment)

		  DECLARE @ans int;
		SET @ans = 1
		SELECT 'ans' = @ans;
GO

EXEC AddVoteAndResponseTrial 5,1,5,'I love this trail';
GO
/*--------------------------------------------------------------------------*/	