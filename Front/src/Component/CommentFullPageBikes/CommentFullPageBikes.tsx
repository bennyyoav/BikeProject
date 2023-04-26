import "./CommentFullPageBikes.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetAllVotesForBike,
  GetBikeByID,
  GetUserByEntranceId,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { VoteBike, User } from "../../GetAndUpdateDataFromFront/dbClasses";
import { Stars } from "../Grading/Grading";
import { Bike } from "../../Bike";
import { Console } from "console";
export default function CommentFullPage(props: { userPerformLogIn: boolean }) {
  const id = +useParams().id!;
  let [VoteArr, setVoteArr] = useState<VoteBike[]>([]);
  let [bike, setBike] = useState<Bike>();
  let [uploadUser, setUploadUser] = useState<User>();

  useEffect(() => {
    var promises: Promise<any>[] = [];
    GetAllVotesForBike(id).then((voteBikes: VoteBike[]) => {
      voteBikes.forEach(function (voteBike) {
        promises.push(
          GetUserByEntranceId(voteBike.entranceId).then((userVote) => {
            console.log(
              "userVote",
              "entranceId",
              voteBike.entranceId,
              userVote
            );
            voteBike.user = userVote;
          })
        );
      });
      Promise.all(promises).then(() => {
        setVoteArr(voteBikes);
        console.log("voteBikes", voteBikes);
      });
    });
  }, []);

  useEffect(() => {
    if (props.userPerformLogIn === true) {
      GetBikeByID(id).then((ans) => {
        setBike(ans);
        console.log("ans", ans.EntranceId);
        GetUserByEntranceId(ans.EntranceId!).then((uploadUser: User) => {
          setUploadUser(uploadUser);
        });
      });
    }
  }, []);
  if (props.userPerformLogIn === false) {
    return <h1>Log in is required to see the contents of the page</h1>;
  }

  return (
    <div id="votes">
      <h1>{bike?.BikeName}</h1>
      <h2>{`upload by ${uploadUser?.UserName}`}</h2>
      <div>
        <img
          id="uploadUserImage"
          src={uploadUser?.imageUrl}
          alt={bike?.BikeName}
        />
      </div>
      ,<img id="bikeImage" src={bike?.PathToPicture} alt={bike?.BikeName} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {VoteArr.map((vote) => DisplayVote(vote))}
    </div>
  );
}

function DisplayVote(voteBike: VoteBike) {
  // let [voteUser, setVoteUser] = useState<User | null>(null);
  // GetUserByEntranceId(vote.entranceId).then((ans) => {
  //   setVoteUser(ans);
  // });

  return (
    <div className="userVote">
      {voteBike.user && (
        <div className="user">
          <div>{voteBike?.user?.UserName}</div>
          <img
            className="voterImage"
            src={voteBike.user?.imageUrl}
            alt={voteBike.user?.UserName}
          />
        </div>
      )}
      <div className="comment">{voteBike.Comment}</div> <br></br>
      <Stars theNum={voteBike.Vote} />
    </div>
  );
}

// <div>
//   BikeFullPage use {JSON.stringify(GetAllVotesForBike(+useParams().id!))}
// </div>

// {props.cards.map((curr, i) => (
// <BikeCard
//   key={i}
//   theBike={curr as Bike}
//   setCarrArr={
//     props.setGalleryArr as React.Dispatch<
//       React.SetStateAction<Bike[]>
//     >
//   }
