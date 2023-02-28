import { FaVoteYea } from "react-icons/fa";
import { GiMountainCave } from "react-icons/gi";
import "./GradingForm.css";
import Collapsible from "react-collapsible";
import { SingleTrack } from "../../../SingleTrack";
export function SingleGradingForm(props: {
  indexAtArr: number;
  theSingel: SingleTrack;
  setCarrArr: React.Dispatch<React.SetStateAction<SingleTrack[]>>;
  cardArray: SingleTrack[];
}) {
  return (
    <div className="vote">
      <Collapsible
        trigger={
          <div className="gradingLabelDiv">
            <h3>
              {" "}
              Want to rate and review the Single ?
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <GiMountainCave />
            </h3>
          </div>
        }
        open={false}
      >
        <div className="gradeButton">
          <label>grade</label>
          <select name="Bike Grade" className={`BikeGrade${props.indexAtArr}`}>
            {[...Array(5)].map((curr, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="commentInput">
          <label>comment :</label>
          <input placeholder="Insert your comment"></input>
        </div>
        <button
          className="VoteButton"
          onClick={() => {
            //let tempArr=[...props.cardArray];
            let tempArr = props.cardArray.slice();

            let bikeWithNewGrade = props.theSingel;

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
          {/* icon of vote */}
          <FaVoteYea />
        </button>
      </Collapsible>
    </div>
  );
}
