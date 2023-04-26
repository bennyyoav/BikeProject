import "./CommentFullPageTrails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetAllVotesForTrail,
  GetTrailByID,
  GetUserByEntranceId,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { VoteTrail, User } from "../../GetAndUpdateDataFromFront/dbClasses";
import { Stars } from "../Grading/Grading";
import { Trail } from "../../SingleTrack";
export default function CommentFullPageTrail(props: {
  userPerformLogIn: boolean;
}) {
  const id = +useParams().id!;
  let [VoteArr, setVoteArr] = useState<VoteTrail[]>([]);
  let [trail, setTrail] = useState<Trail>();
  let [uploadUser, setUploadUser] = useState<User>();

  useEffect(() => {
    var promises: Promise<any>[] = [];
    GetAllVotesForTrail(id).then((voteTrails: VoteTrail[]) => {
      voteTrails.forEach(function (voteTrail) {
        promises.push(
          GetUserByEntranceId(voteTrail.entranceId).then((userVote) => {
            console.log(
              "userVote",
              "entranceId",
              voteTrail.entranceId,
              userVote
            );
            voteTrail.user = userVote;
          })
        );
      });
      Promise.all(promises).then(() => {
        setVoteArr(voteTrails);
        console.log("voteBikes", voteTrails);
      });
    });
  }, []);

  useEffect(() => {
    if (props.userPerformLogIn === true) {
      GetTrailByID(id).then((ans) => {
        setTrail(ans);
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
      <h1>{trail?.TrailName}</h1>
      <h2>{`upload by ${uploadUser?.UserName}`}</h2>
      <div>
        <img
          id="uploadUserImage"
          src={uploadUser?.imageUrl}
          alt={trail?.TrailName}
        />
      </div>
      ,<img id="bikeImage" src={trail?.PathToPicture} alt={trail?.TrailName} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {VoteArr.map((vote) => DisplayVote(vote))}
    </div>
  );
}

function DisplayVote(voteTrail: VoteTrail) {
  return (
    <div className="userVote">
      {voteTrail.user && (
        <div className="user">
          <div>{voteTrail?.user?.UserName}</div>
          <img
            className="voterImage"
            src={voteTrail.user?.imageUrl}
            alt={voteTrail.user?.UserName}
          />
        </div>
      )}
      <div className="comment">{voteTrail.Comment}</div> <br></br>
      <Stars theNum={voteTrail.Vote} />
    </div>
  );
}
