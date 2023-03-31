import { Bike } from "../Bike";
import { SingleTrack } from "../SingleTrack";
import {
  Entrance,
  sqlToJsDate,
  User,
  ReceivedVoteBike,
  AddVoteBike,
  Activity,
  AddVoteTrail,
} from "./dbClasses";

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
      return responseFunc(resultAsObj);
      // return resultAsObj;
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
  return postData(
    `http://${BACK_SERVER}/users/activity/${userId}`,
    `GetUserActivity id ${userId}`,
    ResponseToGetUserActivity
  );
};

//===============================================================================
export const addEntrance = (
  userId: number,
  macAddress: string
  //func: (arg: any) => any = ResponseToAddEntrance
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

export const UpdateEntranceLogOutTime = (EntranceID: Number) => {
  console.log(
    `http://${BACK_SERVER}/users/UpdateEntranceLogOutTime/${EntranceID}`
  );

  return postData(
    `http://${BACK_SERVER}/users/UpdateEntranceLogOutTime/${EntranceID}`,
    "UpdateEntranceLogOutTime",
    ResponseToUpdateEntranceLogOutTime,
    "POST"
  );
};
//=================================================================================
export const GetAverageGradingTrail = (trailId: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/GetAverageGradingTrail/${trailId}`,
    `GetAverageGradingTrail ${trailId}`,
    ResponseToGetAverageGradingTrail
  );
};
//=================================================================================
export const GetAverageGradingBike = (bikeId: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/GetAverageGradingBike/${bikeId}`,
    `GetAverageGradingBike ${bikeId}`,
    ResponseToGetAverageGradingBike
  );
};
//=================================================================================
export const HasUserVoteToTRail = (userId: Number, trailId: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/HasUserVoteToTRail/${userId}/${trailId}`,
    ` Has user vote to trail ${userId} ${trailId}`,
    ResponseToGetHasUserVoteToTRail
  );
};
//======================================================
export const IsUserExist = (userName: String) => {
  return postData(
    `http://${BACK_SERVER}/users/IsUserExist/${userName}`,
    `Is User exist`,
    ResponseToIsUserExist
  );
};

//======================================================
export const CheckPassword = (userName: String, Password: string) => {
  return postData(
    `http://${BACK_SERVER}/users/CheckPassword/${userName}/${Password}`,
    `CheckPassword`,
    ResponseToCheckPassword
  );
};

//=======================================================
export const GetBikes = () => {
  return postData(
    `http://${BACK_SERVER}/users/Bikes/`,
    `GetBikes`,
    ResponseToGetBikes
  );
};

//=====================================================
export const GetTrails = () => {
  return postData(
    `http://${BACK_SERVER}/users/Trails/`,
    `GetTrails`,
    ResponseToGetTrails
  );
};

//=====================================================
export const HasUserVoteToBIke = (userId: Number, bikeId: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/HasUserVoteToBIke/${userId}/${bikeId}`,
    ` Has user vote To bike  ${userId} ${bikeId}`,
    ResponseToHasUserVoteToBIke
  );
};
//===========================================================
export const AddUser = (body: User) => {
  return postData(
    `http://${BACK_SERVER}/users/AddUser/`,
    `AddUser ${JSON.stringify(body)}`,
    ResponseToAddUser,
    "POST",
    body
  );
};

//=========================================================

export const GetNumberOfVoteBike = (bikeId: number) => {
  return postData(
    `http://${BACK_SERVER}/users/GetNumberOfVoteBike/${bikeId}`,
    `Get Number Of Vote Bike ${bikeId}`,
    ResponseToGetNumberOfVoteBike
  );
};
//=========================================================

export const GetNumberOfVoteTrail = (trailId: number) => {
  return postData(
    `http://${BACK_SERVER}/users/GetNumberOfVoteTrail/${trailId}`,
    `Get Number Of Vote Bike ${trailId}`,
    ResponseToGetNumberOfVoteTrail
  );
};
//=========================================================

export const AddVoteAndResponseBike = (Vote: AddVoteBike) => {
  return postData(
    `http://${BACK_SERVER}/users/AddVoteAndResponseBike/`,
    `Add vote and response bike ${Vote.BikeId}`,
    ResponseToAddVoteAndResponseBike,
    "POST",
    Vote
  );
};

//=========================================================

export const AddVoteAndResponseTrail = (Vote: AddVoteTrail) => {
  return postData(
    `http://${BACK_SERVER}/users/AddVoteAndResponseTrail/`,
    `Add vote and response bike ${Vote.TrailId}`,
    ResponseToAddVoteAndResponseBike,
    "POST",
    Vote
  );
};

//=========================================================
export const AddScoreToUserByUserID = (userId: string, score: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/AddScoreToUserByUserID/${userId}/${score}`,
    `AddScoreToUserByUserID ${userId}`,
    ResponseToAddScoreToUserByUserID
  );
};

//=========================================================
export const GetUserByUserName = (userName: string) => {
  return postData(
    `http://${BACK_SERVER}/users/GetUserByUserName/${userName}`,
    `GetUserByUserName ${userName}`,
    ResponseToGetUserByUserName
  );
};

//==============================================================
export const AddScoreToUser = (userName: string, score: Number) => {
  return postData(
    `http://${BACK_SERVER}/users/AddScoreToUser/${userName}/${score}`,
    `AddScoreToUser ${userName}`,
    ResponseToAddScoreToUser
  );
};

//=========================================================

function ResponseToAddEntrance(ans: { EntranceID: string }[]) {
  //ans has field  of  EntranceID
  console.log(`new Entrance ID =  ${ans[0].EntranceID}`);
  return ans[0].EntranceID;
}

function ResponseToGetAllVotesForTrail(votes: ReceivedVoteBike[]) {
  console.log(`All Votes For Trail`);
  votes.forEach((vote) => {
    console.log(`${JSON.stringify(vote)}`);
    console.log(
      ` ${vote.Vote} ${vote.LogInTime} ${vote.FullName} ${vote.Comment}`
    );
  });
}

function ResponseToGetUserActivity(ans: Activity[]) {
  console.log(`Get User Activity`);
  ans.forEach((vote) => {
    console.log(`${JSON.stringify(vote)}`);
  });
  return ans;
}

function ResponseToUpdateEntranceLogOutTime(ans: Entrance[]) {
  sqlToJsDate(ans[0].LogOutTime!);
  console.log(`Updated entrance LogOutTime is  =
    ${formatDate(sqlToJsDate(ans[0].LogOutTime!))}`); //I means that i know that LogOutTime is not null
  return ans[0];
}

function ResponseToGetAverageGradingTrail(
  ans: { TrailAverageGrade: string }[]
) {
  if (ans[0].TrailAverageGrade) {
    console.log(`Average Grading Trail is ${ans[0].TrailAverageGrade}`);
    return ans[0].TrailAverageGrade;
  } else {
    console.log(`0 voutes `);
    return 0;
  }
}
function ResponseToGetAverageGradingBike(ans: { bikeAverageGrade: string }[]) {
  if (ans[0].bikeAverageGrade) {
    console.log(`Average Grading Trail is ${ans[0].bikeAverageGrade}`);
    return ans[0].bikeAverageGrade;
  } else {
    console.log(`0 voutes `);
    return 0;
  }
}
function ResponseToGetHasUserVoteToTRail(ans: { ans: boolean }[]) {
  console.log(`UserVoteToTRail =${ans[0].ans}`);
}

function ResponseToHasUserVoteToBIke(ans: { ans: boolean }[]) {
  console.log(`UserVoteToTRail =${ans[0].ans}`);
}

function ResponseToAddUser(ans: { userID: Number }[]) {
  console.log(`new user =${JSON.stringify(ans)}`);
  return ans[0].userID;
}
function ResponseToGetNumberOfVoteBike(ans: { NumberOfVote: number }[]) {
  console.log(`Number Of Vote Bike is =${ans[0].NumberOfVote}`);
  return ans[0].NumberOfVote;
}

function ResponseToGetNumberOfVoteTrail(ans: { NumberOfVote: number }[]) {
  console.log(`Number Of Vote Trail is =${ans[0].NumberOfVote}`);
  return ans[0].NumberOfVote;
}

function ResponseToGetBikes(bikeArry: Bike[]) {
  var promises: Promise<Bike>[] = [];
  console.log("at ResponseToGetBikes");

  bikeArry.forEach((elem) => {
    promises.push(
      GetAverageGradingBike(elem.id!).then((bikeGrade) => {
        elem.grade = bikeGrade;
        return GetNumberOfVoteBike(elem.id!).then((voters) => {
          elem.voters = voters;
          return elem;
        });
      })
    );
  });

  return Promise.all(promises);
}

function ResponseToAddVoteAndResponseBike(ans: { ans: boolean }[]) {
  console.log(`add vote to bike  = ${ans[0].ans}`);
  return ans[0].ans;
}

function ResponseToAddVoteAndResponseTrail(ans: { ans: boolean }[]) {
  console.log(`add vote to trail  = ${ans[0].ans}`);
  return ans[0].ans;
}

function ResponseToGetTrails(singleTrekArr: SingleTrack[]) {
  var promises: Promise<SingleTrack>[] = [];

  console.log("at ResponseToGet Trail");

  singleTrekArr.forEach((elem) => {
    promises.push(
      GetAverageGradingTrail(elem.id!).then((singleTrekGrade) => {
        elem.grade = singleTrekGrade;
        return GetNumberOfVoteTrail(elem.id!).then((voters) => {
          elem.voters = voters;
          return elem;
        });
      })
    );
  });

  return Promise.all(promises);
}
//=======================================================================

//==========utility functions===================//
function formatDate(date: Date) {
  console.log(date.getTime());
  return (
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":") +
    "  " +
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/")
  );
}
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function ResponseToIsUserExist(ans: { ans: boolean }[]) {
  console.log(`IsUserExist ans  =${ans[0].ans}`);
  return ans[0].ans;
}
function ResponseToCheckPassword(ans: { ans: boolean }[]) {
  console.log(`CheckPassword ans  =${ans[0].ans}`);
  return ans[0].ans;
}

function ResponseToGetUserByUserName(ans: User[]) {
  console.log(`GetUserByUserName ans  = ${JSON.stringify(ans[0])}`);

  return ans[0];
}

function ResponseToAddScoreToUserByUserID(ans: User[]) {
  console.log(`AddScoreToUserByUserID ans  = ${JSON.stringify(ans[0])}`);

  return ans[0];
}

function ResponseToAddScoreToUser(ans: boolean[]) {
  console.log(`ResponseToAddScoreToUser =${ans[0]}`);
  return ans[0];
}
//==========utility functions end===================//

//how to call functions

// GetAllVotesForTrail(1);
// GetUserActivity(1);
// addEntrance(1, "70-DD-DD-6A-D1-19");
// UpdateEntranceLogOutTime(1);
// GetAverageGradingTrail(5);
// GetAverageGradingBike(1);
// HasUserVoteToTRail(1, 1);
// HasUserVoteToBIke(1, 1);

// AddUser(new User("Haim", "Bardugo", "sa1", "1234", null));
//GetBikes();
//GetTrails();
