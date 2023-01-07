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

//const appPool = new mssql.ConnectionPool(sqlConfig);


//const appPool = new mssql.ConnectionPool('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true;max pool size=10;');

const getUserActivity = async  (body,params)=> {
    try
     {
        console.log("at getUserActivity");
        let pool = await mssql.connect(sqlConfig);
       
        let reqRes = await pool.request()
        .input('UserId', mssql.Int, params.userId)
        .execute('GetAllActivityOfUser');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }
}


module.exports.getUserActivity = getUserActivity;



const addEntrance = async (body,params) => {
    try
     {
        console.log("at addEntrance");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('macAddress', mssql.VarChar, body.macAddress)
        .input('userId', mssql.Int, body.userId)
        .execute('AddEntrance');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.addEntrance = addEntrance;


const UpdateEntranceLogOutTime = async (body,params) => {
    try
     {
        console.log("at UpdateEntranceLogOutTime");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('entranceId', mssql.Int, params.EntranceId)
        .execute('UpdateEntranceLogOutTime');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.UpdateEntranceLogOutTime = UpdateEntranceLogOutTime;

const GetAverageGradingTrail = async (body,params) => {
    try
     {
        console.log("at GetAverageGradingTrail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailId', mssql.Int, params.trailId)
        .execute('GetAverageGradingTrail');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.GetAverageGradingTrail = GetAverageGradingTrail;

const GetAverageGradingBike = async (body,params) => {
    try
     {
        console.log("at GetAverageGradingBike");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, params.bikeId)
        .execute('GetAverageGradingBike');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.GetAverageGradingBike = GetAverageGradingBike;




const HasUserVoteToTRail = async (body,params) => {
    try
     {
        console.log("at HasUserVoteToTRail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userId', mssql.Int, params.userId)
        .input('trailId', mssql.Int, params.trailId)
        .execute('HasUserVoteToTRail');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.HasUserVoteToTRail = HasUserVoteToTRail;


const HasUserVoteToBIke = async (body,params) => {
    try
     {
        console.log("at HasUserVoteToBIke");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('userId', mssql.Int, params.userId)
        .input('bikeId', mssql.Int, params.bikeId)
        .execute('HasUserVoteToBIke');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.HasUserVoteToBIke = HasUserVoteToBIke;

const AddUser = async (body,params) => {
    try
     {
        console.log("at AddUser");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('firstName', mssql.VarChar, body.firstName)
        .input('lastName', mssql.VarChar, body.lastName)
        .input('uAddress', mssql.VarChar, body.uAddress)
        .input('userName', mssql.VarChar, body.userName)
        .input('upassword', mssql.VarChar, body.upassword)
        .execute('AddUser');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.AddUser = AddUser;


const GetAllVotesForTrail = async (body,params) => {
    try
     {
        console.log("at GetAllVotesForTrail");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqTrailId', mssql.Int, params.trailId)
       
        .execute('GetAllVotesForTrail');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.GetAllVotesForTrail = GetAllVotesForTrail;

const GetAllVotesForBike = async (body,params) => {
    try
     {
        console.log("at GetAllVotesForBike");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .input('reqBikeId', mssql.Int, params.bikeId)
        .execute('GetAllVotesForBike');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.GetAllVotesForBike = GetAllVotesForBike;

const GetNumberOfUsers = async (body,params) => {
    try
     {
        console.log("at GetNumberOfUsers");
        let pool = await mssql.connect(sqlConfig);
        let reqRes = await pool.request()
        .execute('GetNumberOfUsers');
        return (reqRes.recordset);
        
    } 
    catch (err) 
    {
        console.log("there was an error while sending Query to DB: ", err);
        throw err
    }

}
module.exports.GetNumberOfUsers = GetNumberOfUsers;