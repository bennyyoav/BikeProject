import { FaVoteYea } from "react-icons/fa";
import { MdOutlinePedalBike } from "react-icons/md";
import { Bike } from "../../../Bike";
import "./GradingForm.css";
import Collapsible from "react-collapsible";
import {
  AddScoreToUserByUserID,
  AddVoteAndResponseBike,
  GetBikes,
  HasUserVoteToBIke,
} from "../../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { VoteBike } from "../../../GetAndUpdateDataFromFront/dbClasses";
import { useEffect, useState } from "react";
export function BikeGradingForm(props: {
  indexAtArr: number;
  theBike: Bike;
  setCarrArr: React.Dispatch<React.SetStateAction<Bike[]>>;
  cardArray: Bike[];
}) {
  let [hasUserVoteToBike, setHasUserVoteToBike] = useState(false);
  const user_id = (
    document.querySelector("#NavBarAdapter") as HTMLElement
  ).getAttribute("user_id");
  useEffect(() => {
    HasUserVoteToBIke(+user_id!, props.theBike.id!).then((ans: boolean) => {
      setHasUserVoteToBike(ans);
      console.log("HasUserVoteToBIke", hasUserVoteToBike);
    });
  }, []);
  return (
    <div className="vote">
      {!hasUserVoteToBike ? (
        <Collapsible
          trigger={
            <div className="gradingLabelDiv">
              <h3>
                {" "}
                <span className="gradingText">
                  Want to rate and review the bikes ?
                </span>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MdOutlinePedalBike />
              </h3>
            </div>
          }
          open={false}
        >
          <div className="gradeButton">
            <label>grade</label>
            <select
              name="Bike Grade"
              className={`BikeGrade${props.indexAtArr}`}
              id={`${props.theBike.id}`}
            >
              {[...Array(5)].map((curr, index) => (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="commentInput" id={`commentInput${props.theBike.id}`}>
            <label>comment :</label>
            <input placeholder="Insert your comment"></input>
          </div>
          <button
            className="VoteButton"
            onClick={() => {
              let addVoteBike = new VoteBike();
              addVoteBike.entranceId = +(
                document.querySelector("#NavBarAdapter") as HTMLElement
              ).getAttribute("entrance_id")!;
              addVoteBike.BikeId = props.theBike.id!;
              addVoteBike.Vote = +(
                document
                  .querySelectorAll(`[id_bike="${props.theBike.id}"]`)[0]
                  .querySelector(".vote")
                  ?.querySelector("select") as HTMLSelectElement
              ).value;

              addVoteBike.Comment = (
                document
                  .querySelectorAll(`[id_bike="${props.theBike.id}"]`)[0]
                  .querySelector(".vote")
                  ?.querySelector("input") as HTMLInputElement
              ).value;

              console.log(addVoteBike);

              AddVoteAndResponseBike(addVoteBike).then((response) => {
                if (response) {
                  //vote ik ok
                  const userId = (
                    document.querySelector("#NavBarAdapter") as HTMLElement
                  ).getAttribute("user_id");
                  AddScoreToUserByUserID(userId!, 10).then(() => {
                    GetBikes().then((ans) => {
                      console.log(JSON.stringify(ans));
                      props.setCarrArr(ans);
                      UpdateNavBarScore(10);
                      setHasUserVoteToBike(true);
                    });
                  });
                }
              });
            }}
          >
            {/* icon of vote */}
            <FaVoteYea />
          </button>
        </Collapsible>
      ) : (
        "You've already voted for the bikes"
      )}
    </div>
  );
}
export function UpdateNavBarScore(score: number) {
  let scoreStr = (document.querySelector("#yourScoreIs") as HTMLDivElement)
    .innerHTML;
  let scoreNum = +scoreStr.split(": ")[1];
  scoreNum += score;
  (
    document.querySelector("#yourScoreIs") as HTMLDivElement
  ).innerHTML = `your score is: ${scoreNum}`;
}
