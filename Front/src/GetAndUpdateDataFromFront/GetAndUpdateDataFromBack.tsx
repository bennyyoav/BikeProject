import { Bike } from "../Bike";
import { SingleTrack } from "../SingleTrack";
import { Entrance, sqlToJsDate, User, Vote } from "./dbClasses";

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
  postData(
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
    `http://${BACK_SERVER}/users/GetNumberOfVoteBike/${trailId}`,
    `Get Number Of Vote Bike ${trailId}`,
    ResponseToGetNumberOfVoteTrail
  );
};
//=========================================================

function ResponseToAddEntrance(ans: { EntranceID: string }[]) {
  //ans has field  of  EntranceID
  console.log(`new Entrance ID =  ${ans[0].EntranceID}`);
  return ans[0].EntranceID;
}

function ResponseToGetAllVotesForTrail(votes: Vote[]) {
  console.log(`All Votes For Trail`);
  votes.forEach((vote) => {
    console.log(`${JSON.stringify(vote)}`);
    console.log(
      ` ${vote.Vote} ${vote.LogInTime} ${vote.FullName} ${vote.Comment}`
    );
  });
}

function ResponseToGetUserActivity(ans: Vote[]) {
  console.log(`Get User Activity`);
  ans.forEach((vote) => {
    console.log(`${JSON.stringify(vote)}`);
  });
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
  } else {
    console.log(`0 voutes `);
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
        GetNumberOfVoteBike(elem.id!).then((voters) => {
          elem.voters = voters;
        });
        return elem;
      })
    );
  });

  return Promise.all(promises);
}

function ResponseToGetTrails(singleTrekArr: SingleTrack[]) {
  var promises: Promise<SingleTrack>[] = [];
  console.log("at ResponseToGet Trail");

  singleTrekArr.forEach((elem) => {
    promises.push(
      GetAverageGradingTrail(elem.id!).then((singleTrekGrade) => {
        elem.grade = singleTrekGrade;
        GetNumberOfVoteTrail(elem.id!).then((voters) => {
          elem.voters = voters;
        });
        return elem;
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
