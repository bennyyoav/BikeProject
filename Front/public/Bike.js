
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
            body: JSON.stringify({body }),
            headers: {'Content-Type': 'application/json' },
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
const addEntrance = (userId,body) =>{postData(`http://localhost/users/addEntrance/`,`add Entrance id ${userId}`,'POST',body);}
const UpdateEntranceLogOutTime =(EntrenceID)=>{postData(`http://localhost/users/UpdateEntranceLogOutTime/${EntrenceID}`,'UpdateEntranceLogOutTime' ,'POST')}
const GetAverageGradingTrail = (trailId)=>{postData(`http://localhost/users/GetAverageGradingTrail/${trailId}`)}

GetUserActivity(1);
GetAllVotesForTrail(2);
addEntrance(1,{
    "userId": "1",
     "macAddress": "70-FF-DD-6A-D1-19"
  });
  UpdateEntranceLogOutTime(2)
  GetAverageGradingTrail(2)



