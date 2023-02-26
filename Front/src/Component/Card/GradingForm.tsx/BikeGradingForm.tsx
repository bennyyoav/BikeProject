import { FaVoteYea } from "react-icons/fa";
import { MdOutlinePedalBike } from "react-icons/md";
import { Bike } from "../../../Bike";
import "./BikeGradingForm.css";
import Collapsible from "react-collapsible";
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
              Want to Grade and vote the bikes ? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MdOutlinePedalBike />
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
          {/* icon of vote */}
          <FaVoteYea />
        </button>
      </Collapsible>
    </div>
  );
}
