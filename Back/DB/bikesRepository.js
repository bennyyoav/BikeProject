const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()


const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    server: process.env.SQL_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure you need to change to true
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}


const getUserActivity = async  (req,res)=> {
    try
     {
        console.log("at getUserActivity");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('UserId', mssql.Int, req.params.userId)
        .execute('GetAllActivityOfUser');
        res.send (reqRes.recordset); 
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }
}
module.exports.getUserActivity = getUserActivity;

const addEntrance = async (req,res) => {
    try
     {
        console.log("at addEntrance");
        console.log(req.body)
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('macAddress', mssql.VarChar, req.body.MacAddress)
        .input('userId', mssql.Int, req.body.UserId)
        .execute('AddEntrance');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.addEntrance = addEntrance;

const addBike = async (req,res) => {
    try
     {
        console.log("at addBike");
        console.log(req.body)
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.body.entranceId)
        .input('BikeName', mssql.VarChar(255), req.body.BikeName )
        .input('BikeManufacturer', mssql.VarChar(255), req.body.BikeManufacturer )
        .input('PathToPicture', mssql.VarChar(255), req.body.PathToPicture )
        .execute('AddBike');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.addBike = addBike;



const AddTrail = async (req,res) => {
    try
     {
        console.log("at AddTrail");
        console.log(req.body)
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.body.entranceId)
        .input('TrailName', mssql.VarChar(255), req.body.TrailName )
        .input('TrailLevel', mssql.VarChar(255), req.body.TrailLevel )
        .input('PathToPicture', mssql.VarChar(255), req.body.PathToPicture )
        .execute('AddTrail');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}


module.exports.AddTrail = AddTrail;

const UpdateEntranceLogOutTime = async (req,res) => {
    try
     {
        console.log("at UpdateEntranceLogOutTime");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.params.EntranceId)
        .execute('UpdateEntranceLogOutTime');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }
    

}
module.exports.UpdateEntranceLogOutTime = UpdateEntranceLogOutTime;

const GetAverageGradingTrail = async (req,res) => {
    try
     {
        console.log("at GetAverageGradingTrail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailId', mssql.Int, req.params.trailId)
        .execute('GetAverageGradingTrail');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetAverageGradingTrail = GetAverageGradingTrail;

const GetAverageGradingBike = async (req,res) => {
    try
     {
        console.log("at GetAverageGradingBike");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, req.params.bikeId)
        .execute('GetAverageGradingBike');
        res.send (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetAverageGradingBike = GetAverageGradingBike;

const HasUserVoteToTRail = async (req,res) => {
    try
     {
        console.log("at HasUserVoteToTRail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userId', mssql.Int, req.params.userId)
        .input('trailId', mssql.Int, req.params.trailId)
        .execute('HasUserVoteToTRail');
        res.send(reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.HasUserVoteToTRail = HasUserVoteToTRail;

const HasUserVoteToBIke = async (req,res) => {
    try
     {
        console.log("at HasUserVoteToBIke");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userId', mssql.Int, req.params.userId)
        .input('bikeId', mssql.Int, req.params.bikeId)
        .execute('HasUserVoteToBIke');
        res.send (reqRes.recordset); 
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.HasUserVoteToBIke = HasUserVoteToBIke;

const AddUser = async (req,res) => {
    try
     {
        console.log("at AddUser");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('firstName', mssql.VarChar, req.body.firstName)
        .input('lastName', mssql.VarChar, req.body.lastName)
        .input('uAddress', mssql.VarChar, req.body.uAddress)
        .input('UserName', mssql.VarChar, req.body.UserName)
        .input('uPassword', mssql.VarChar, req.body.uPassword)
        .input('imageUrl', mssql.VarChar, req.body.imageUrl)
        .input('score', mssql.Int, req.body.score)
        .execute('AddUser');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.AddUser = AddUser;

const GetAllVotesForTrail = async (req,res) => {
    try
     {
        console.log("at GetAllVotesForTrail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailId', mssql.Int, req.params.trailId)
        .execute('GetAllVotesForTrail');
        res.send(reqRes.recordset)
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetAllVotesForTrail = GetAllVotesForTrail;

const GetAllVotesForBike = async (req,res) => {
    try
     {
        console.log("at GetAllVotesForBike");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, req.params.bikeId)
        .execute('GetAllVotesForBike');
        res.send(reqRes.recordset);
     }
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetAllVotesForBike = GetAllVotesForBike;

const GetNumberOfUsers = async (req, res) => {
    try
     {
        console.log("at GetNumberOfUsers");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .execute('GetNumberOfUsers');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetNumberOfUsers = GetNumberOfUsers;
const getBikes= async (req, res) => {
    try
     {
        console.log("at get Bikes");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .execute('GetAllBikes');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }
}
module.exports.getBikes = getBikes;


const getTrails = async (req, res) => {
    try
     {
        console.log("at get Trail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .execute('GetAllTrials');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }
}
module.exports.getTrails = getTrails;

const GetNumberOfVoteBike = async (req, res) => {
    try
     {
        console.log("get Number Of Vote Bike");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, req.params.bikeId)
        .execute('GetNumberOfVotesForBike');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetNumberOfVoteBike = GetNumberOfVoteBike;

const GetNumberOfVoteTrail = async (req, res) => {
    try
     {
        console.log("get Number Of Vote Trail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailID', mssql.Int, req.params.trailId)
        .execute('GetNumberOfVotesForTrail');
        res.send(reqRes.recordset);
        
     }
     catch (err) 
     {
         console.log("there was an error while sending Query to DB: ", err);
         res.send(err)
     }
}
module.exports.GetNumberOfVoteTrail = GetNumberOfVoteTrail;


const AddVoteAndResponseBike = async (req,res) => {
    try
     {
        console.log("at AddVoteAndResponseBike");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.body.entranceId )
        .input('BikeId', mssql.Int, req.body.BikeId)
        .input('Vote', mssql.Int, req.body.Vote)
        .input('Comment', mssql.VarChar, req.body.Comment)
        .execute('AddVoteAndResponseBike');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.AddVoteAndResponseBike = AddVoteAndResponseBike;

const IsUserExist = async (req,res) => {
    try
     {
        console.log("at IsUserExist");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userName', mssql.VarChar, req.params.userName)
        .execute('IsUserExist');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}

module.exports.IsUserExist = IsUserExist;


const CheckPassword = async (req,res) => {
    try
     {
        console.log("at CheckPassword");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userName', mssql.VarChar, req.params.userName)
        .input('password', mssql.VarChar, req.params.password)
        .execute('CheckPassword');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}

module.exports.CheckPassword = CheckPassword;



const GetUserByUserName = async (req,res) => {
    try
     {
        console.log("at GetUserByUserName");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userName', mssql.VarChar, req.params.userName)
        .execute('GetUserByUserName');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}

module.exports.GetUserByUserName = GetUserByUserName;




const AddScoreToUser = async (req,res) => {
    try
     {
        console.log("at AddScoreToUser");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userName', mssql.VarChar, req.params.userName)
        .input('score', mssql.VarChar, req.params.score)
        .execute('AddScoreToUser');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}

module.exports.AddScoreToUser = AddScoreToUser;


const AddScoreToUserByUserID = async (req,res) => {
    try
     {
        console.log("at AddScoreToUserByUserID");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userId', mssql.Int, req.params.userId)
        .input('score', mssql.VarChar, req.params.score)
        .execute('AddScoreToUserByUserID');
        res.send(reqRes.recordset);
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.AddScoreToUserByUserID = AddScoreToUserByUserID;

const AddVoteAndResponseTrail = async (req,res) => {
    try
     {
        console.log("at AddVoteAndResponseTrail");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.body.entranceId )
        .input('TrailId', mssql.Int, req.body.TrailId)
        .input('Vote', mssql.Int, req.body.Vote)
        .input('Comment', mssql.VarChar, req.body.Comment)
        .execute('AddVoteAndResponseTrial');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.AddVoteAndResponseTrail = AddVoteAndResponseTrail;


const GetBikeByID = async (req,res) => {
    try
     {
        console.log("at GetBikeByID");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, req.params.bikeId)
        .execute('GetBikeByID');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetBikeByID = GetBikeByID;



const GetTrailByID = async (req,res) => {
    try
     {
        console.log("at GetTrailByID");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailId', mssql.Int, req.params.trailId)
        .execute('GetTrailByID');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetTrailByID = GetTrailByID;





const GetUserByEntranceId = async (req,res) => {
    try
     {
        console.log("at GetUserByEntranceId");
        console.log(req.body);
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, req.params.entranceId)
        .execute('GetUserByEntranceId');
        res.send(reqRes.recordset);   
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        res.send(err)
    }

}
module.exports.GetUserByEntranceId = GetUserByEntranceId;