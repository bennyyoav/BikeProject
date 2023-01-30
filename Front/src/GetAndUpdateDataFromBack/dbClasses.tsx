export class Entrance {
  "id": number | null;
  "UserId": number;
  "MacAddress": String;
  "LogInTime": String | null;
  "LogOutTime": String | null;
  constructor(userId: number, macAddress: string) {
    this.UserId = userId;
    this.MacAddress = macAddress;
  }
}

export class User {
  "id": number | null;
  "FirstName": String;
  "lastName": String;
  "uAddress": String;
  "userName": String;
  "uPassword": String;
  constructor(
    firstName: String,
    lastName: String,
    uAddress: String,
    userName: String,
    uPassword: String
  ) {
    this.FirstName = firstName;
    this.lastName = lastName;
    this.uAddress = uAddress;
    this.userName = userName;
    this.uPassword = uPassword;
  }
}
export class Vote {
  "id": number | null;
  "FullName": String;
  "Vote": number;
  "Comment": String;
  "LogInTime": String;
  constructor(
    id: number,
    fullName: string,
    vote: number,
    comment: string,
    logInTime: string
  ) {
    this.id = id;
    this.FullName = fullName;
    this.Vote = vote;
    this.Comment = comment;
    this.LogInTime = logInTime;
  }
}
