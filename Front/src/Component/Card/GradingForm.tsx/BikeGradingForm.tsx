import { FaVoteYea } from "react-icons/fa";
import { Bike } from "../../../Bike";

export function BikeGradingForm(props: {
  indexAtArr: number;
  theBike: Bike;
  setCarrArr: React.Dispatch<React.SetStateAction<Bike[]>>;
  cardArray: Bike[];
}) {
  return (
    <div className="vote">
      <div className="gradingLabelDiv">
        <label>
          <u>Score and Comment the bikes</u>
        </label>
      </div>

      <select name="Bike Grade" className={`BikeGrade${props.indexAtArr}`}>
        {[...Array(5)].map((curr, index) => (
          <option value={index + 1} key={index}>
            {index + 1}
          </option>
        ))}
      </select>
      <div className="gradeButton">
        <label>grade and comment</label>
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
            //Average CALC
            bikeWithNewGrade.grade =
              (oldVoteAverageNumber * votersNum + newVote) / (votersNum + 1);
            bikeWithNewGrade.voters += 1;
            tempArr.splice(props.indexAtArr, 1, bikeWithNewGrade);
            props.setCarrArr([...tempArr]);
          }}
        >
          <FaVoteYea />{" "}
        </button>
      </div>

      <div className="commentInput">
        <label>comment :</label>
        <input placeholder="Insert your comment"></input>
      </div>
    </div>
  );
}
