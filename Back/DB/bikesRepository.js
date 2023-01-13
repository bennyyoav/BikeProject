const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();


const sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
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
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('macAddress', mssql.VarChar, req.body.macAddress)
        .input('userId', mssql.Int, req.body.userId)
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
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('firstName', mssql.VarChar, req.body.firstName)
        .input('lastName', mssql.VarChar, req.body.lastName)
        .input('uAddress', mssql.VarChar, req.body.uAddress)
        .input('userName', mssql.VarChar, req.body.userName)
        .input('upassword', mssql.VarChar, req.body.upassword)
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