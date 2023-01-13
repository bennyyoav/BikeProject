
const postData = (url,dataToConsole,method='GET',body=null) => {
    console.log(dataToConsole);
    let reqJsonData;
    if (body==null)
    {
         reqJsonData={ method: method};
    }
    else
    {
        reqJsonData ={
            method: method,
            body: JSON.stringify({
                "userId": "1",
                "macAddress": "70-FF-DD-6A-D1-19"
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        } 
    }
    fetch(url, reqJsonData )
    .then((resultFromServer) => {
        return resultFromServer.json();
    })
    .then((resultAsObj) => {
        console.log(resultAsObj);
        return (resultAsObj)
    })
    .catch((err) => {
        console.log(err);
        })
}
//===============================================================================

const GetAllVotesForTrail = (trailId)=>{postData(`http://localhost/users/GetAllVotesForTrail/${trailId}`,`GetAllVotesForTrail id ${trailId}` );}
const GetUserActivity = (userId) =>{postData(`http://localhost/users/activity/${userId}`,`GetUserActivity id ${userId}`);}
const addEntrance = (userId,body) =>{postData(`http://localhost/users/addEntrance/`,`addEntrance id ${userId}`,'POST',body);}

GetUserActivity(1);
GetAllVotesForTrail(2);
addEntrance(1,{
    "userId": "1",
     "macAddress": "70-FF-DD-6A-D1-19"
  });

//addEntrance(3);
// post http://localhost/users/addEntrance/
// {
//         "userId": "1",
//         "macAddress": "70-FF-DD-6A-D1-19"
// }

// post http://localhost/users/UpdateEntranceLogOutTime/31
// GET http://localhost/users/getGradeTrail/4
// GET http://localhost/users/getGradeBike/4
// GET http://localhost/users/HasUserVoteToTRail/3/4
// GET http://localhost/users/HasUserVoteToBIke/1/1
// POST http://localhost/users/AddUser/
// {
//     "firstName" :"aaaaa",
//     "lastName" :"aaaaa",
//     "uAddress" :"NULL",
//     "userName" :"aaaaa",
//     "upassword" :"aaaaa"

// }
// GET http://localhost/users/GetAllVotesForBike/1

// GET http://localhost/users/GetAllVotesForTrail/1
// GET http://localhost/users/GetNumberOfUsers

// http://localhost/index.html 
// GetAllVotesForTrail(1)