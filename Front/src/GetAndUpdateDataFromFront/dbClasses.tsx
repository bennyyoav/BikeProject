export class Entrance {
  id?: number;
  UserId: number;
  MacAddress: String;
  LogInTime!: String;
  LogOutTime!: String;
  constructor(UserId: number, MacAddress: String) {
    this.UserId = UserId;
    this.MacAddress = MacAddress;
  }
}

export class User {
  id?: number = -1;
  firstName: string;
  lastName: string;
  UserName: string;
  uPassword: string;
  uAddress?: string = "";
  imageUrl: string;
  score: Number;
  constructor(
    FirstName: string,
    lastName: string,
    UserName: string,
    uPassword: string,
    imageUrl: string,
    score: Number,
    uAddress: string | null = null
  ) {
    this.firstName = FirstName;
    this.lastName = lastName;
    this.UserName = UserName;
    this.uPassword = uPassword;
    this.imageUrl = imageUrl;
    this.score = score;
    if (uAddress) {
      this.uAddress = uAddress;
    }
  }
}
export interface ReceivedVoteBike {
  id: number | null;
  FullName: String;
  Vote: number;
  Comment: String;
  LogInTime: Date;
}

export class AddVoteBike {
  entranceId: Number = 0;
  BikeId: Number = 0;
  Vote: Number = 0;
  Comment: string = "";
}
export interface Activity {
  fullName: String;
  activity: String;
  time: Date;
}

// export interface bike {
//   id: number;
//   BikeName: String;
//   BikeManufacturer: String;
//   PathToPicture: String;
//   UserId: number;
// }

// export interface Trail {
//   id: number;
//   PathToPicture: String;
//   TrailLevel: String;
//   TrailName: String;
//   UserId: number;
// }

export function sqlToJsDate(sqlDate: String) {
  //sqlDate in SQL DATETIME format ("yyyy-mm-ddThh:mm:ss.msZ")
  var sqlDateArr1 = sqlDate.split("-");
  //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
  var sYear = sqlDateArr1[0];
  var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
  var sqlDateArr2 = sqlDateArr1[2].split("T");
  //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
  var sDay = sqlDateArr2[0];
  var sqlDateArr3 = sqlDateArr2[1].split(":");
  //format of sqlDateArr3[] = ['hh','mm','ss.ms']
  var sHour = sqlDateArr3[0];
  var sMinute = sqlDateArr3[1];
  var sqlDateArr4 = sqlDateArr3[2].split(".");
  //format of sqlDateArr4[] = ['ss','ms']
  var sSecond = sqlDateArr4[0];
  var sMillisecond = sqlDateArr4[1].split("Z")[0];

  return new Date(
    Number(sYear),
    Number(sMonth),
    Number(sDay),
    Number(sHour),
    Number(sMinute),
    Number(sSecond),
    Number(sMillisecond)
  );
}
