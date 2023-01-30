import { Entrance, Vote } from "./dbClasses";

const BACK_SERVER = "localhost";

const postData = (
  url: string,
  dataToConsole: string,
  responseFunc: (arg: any) => any,
  method = "GET",
  body: object | null = null
): Promise<any> => {
  console.log(dataToConsole);
  let reqJsonData;
  if (body == null) {
    reqJsonData = { method: method };
  } else {
    console.log(body);
    reqJsonData = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  }
  return fetch(url, reqJsonData)
    .then((resultFromServer) => {
      return resultFromServer.json();
    })
    .then((resultAsObj) => {
      console.log(resultAsObj);
      responseFunc(resultAsObj);
      return resultAsObj;
    })
    .catch((err) => {
      console.log(url);
      console.log(dataToConsole);
      console.log(err);
    });
};
//===============================================================================

export const GetAllVotesForTrail = (
  trailId: number,
  func = ResponseToGetAllVotesForTrail
) => {
  postData(
    `http://${BACK_SERVER}/users/GetAllVotesForTrail/${trailId}`,
    `GetAllVotesForTrail id ${trailId}`,
    ResponseToGetAllVotesForTrail
  );
};
//===============================================================================

export const GetUserActivity = (userId: number) => {
  postData(
    `http://${BACK_SERVER}/users/activity/${userId}`,
    `GetUserActivity id ${userId}`,
    ResponseToGetUserActivity
  );
};

//===============================================================================
export const addEntrance = (
  userId: number,
  macAddress: string,
  func: (arg: any) => any = ResponseToAddEntrance
) => {
  const entrance = new Entrance(userId, macAddress);
  return postData(
    `http://${BACK_SERVER}/users/addEntrance/`,
    `Add new Entrance ${JSON.stringify(entrance)}`,
    ResponseToAddEntrance,
    "POST",
    entrance
  );
};
//======================================================================================

export const UpdateEntranceLogOutTime = (EntrenceID: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/UpdateEntranceLogOutTime/${EntrenceID}`,
    "UpdateEntranceLogOutTime",
    ResponseToUpdateEntranceLogOutTime,
    "POST"
  );
};
//const GetAverageGradingTrail = (trailId)=>{postData(`http://${BACK_SERVER}/users/GetAverageGradingTrail/${trailId}`,`GetAverageGradingTrail ${trailId}`)}
//const GetAverageGradingBike = (bikeId)=>{postData(`http://${BACK_SERVER}/users/GetAverageGradingBike/${bikeId}`,`GetAverageGradingBike ${bikeId}`)}
//const HasUserVoteToTRail = (userId,trailId)=>{postData(`http://${BACK_SERVER}/users/HasUserVoteToTRail/${userId}/${trailId}`,` Has user vote to trail ${userId} ${trailId}`)}
//const HasUserVoteToBIke = (userId,bikeId)=>{postData(`http://${BACK_SERVER}/users/HasUserVoteToBIke/${userId}/${bikeId}`,` Has user vote To bike  ${userId} ${bikeId}`)}
//const AddUser =(body)=>{postData(`http://${BACK_SERVER}/users/AddUser/`,`AddUser ${JSON.parse(body)}` ,'POST',body)}
//GetUserActivity(1);
//GetAllVotesForTrail(2);
//addEntrance(1,"70-DD-DD-6A-D1-19")

export function ResponseToAddEntrance(ans: { EntranceID: string }[]) {
  console.log(`new Entrance ID =  ${ans[0].EntranceID}`);
  return ans[0].EntranceID;
}

function ResponseToGetAllVotesForTrail(votes: Vote[]) {
  console.log(`All Votes For Trail`);
  votes.forEach((vote) => {
    console.log(`${JSON.stringify(vote)}`);
  });
}

function ResponseToGetUserActivity(ans: any) {
  console.log(`Get User Activity  = + ${ans.EntranceID}`);
  return ans.EntranceID;
}

function ResponseToUpdateEntranceLogOutTime(entrance: Entrance[]) {
  console.log(
    `Updated entrance LogOutTime is  =  ${JSON.stringify(entrance[0])}`
  );
  return entrance;
}

//how to call functions

//let ans = addEntrance(1, "70-DD-DD-6A-D1-19");

//GetAllVotesForTrail(2);

//
// GetAverageGradingTrail(2)
// GetAverageGradingBike(5)

//HasUserVoteToTRail(1,1)
//HasUserVoteToBIke(1,1)
//AddUser({
//   "FirstName" :"aaaaa",
//  "lastName" :"bbbbbbb",
//  "uAddress" :"NULL",
//  "userName" :"cccccccccccc",
//  "upassword" :"gggggggggg"

//})
