import { FaVoteYea } from "react-icons/fa";
import { MdOutlinePedalBike } from "react-icons/md";
import { Bike } from "../../../Bike";
import "./GradingForm.css";
import Collapsible from "react-collapsible";
import { AddVoteAndResponseBike } from "../../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { AddVoteBike } from "../../../GetAndUpdateDataFromFront/dbClasses";
export function BikeGradingForm(props: {
  indexAtArr: number;
  theBike: Bike;
  setCarrArr: React.Dispatch<React.SetStateAction<Bike[]>>;
  cardArray: Bike[];
}) {
  return (
    <div className="vote">
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
            //let tempArr=[...props.cardArray];
            let tempArr = props.cardArray.slice();

            let bikeWithNewGrade = props.theBike;

            //calc aver grade
            let votersNum = Number(bikeWithNewGrade.voters);
            let oldVoteAverageNumber = bikeWithNewGrade.grade;
            let newVote = Number(
              (
                document.querySelector(
                  `.BikeGrade${props.indexAtArr}`
                ) as HTMLInputElement
              ).value
            );
            let vote = new AddVoteBike();

            vote.BikeId = Number(props.theBike.id); 
            vote.entranceId = 2;
            vote.Comment = (
              document.querySelector(
                `#commentInput${vote.BikeId} input `
              ) as HTMLInputElement
            ).value;

            AddVoteAndResponseBike(vote);

            //Average CALC

            bikeWithNewGrade.grade =
              (oldVoteAverageNumber * votersNum + newVote) / (votersNum + 1);
            bikeWithNewGrade.voters += 1;
            tempArr.splice(props.indexAtArr, 1, bikeWithNewGrade);
            props.setCarrArr([...tempArr]);
          }}
        >
          {/* icon of vote */}
          <FaVoteYea />
        </button>
      </Collapsible>
    </div>
  );
}
