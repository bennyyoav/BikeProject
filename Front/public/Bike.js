
const postData = (url,dataToConsole,method='GET',body=null) => {
    console.log(dataToConsole);
    console.log(url);
    fetch(url, {
        method: method,
        if (body)
         {
             body: JSON.stringify(body)
         }
        
    })
    
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

const GetAllVotesForTrail = (userId)=>{postData(`http://localhost/users/GetAllVotesForTrail/${userId}`,"GetAllVotesForTrail");}
const GetUserActivity = (userId) =>{postData(`http://localhost/users/activity/${userId}`,"GetUserActivity");}
const addEntrance = (userId) =>{postData(`http://localhost/users/addEntrance/`,"addEntrance",);}

GetUserActivity(1);
GetAllVotesForTrail(2);
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