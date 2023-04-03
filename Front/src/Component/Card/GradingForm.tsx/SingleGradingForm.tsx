import { FaVoteYea } from "react-icons/fa";
import { GiMountainCave } from "react-icons/gi";
import "./GradingForm.css";
import Collapsible from "react-collapsible";
import { SingleTrack } from "../../../SingleTrack";
import { AddVoteTrail } from "../../../GetAndUpdateDataFromFront/dbClasses";
import {
  AddVoteAndResponseTrail,
  GetTrails,
} from "../../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { UpdateNavBarScore } from "./BikeGradingForm";
export function SingleGradingForm(props: {
  indexAtArr: number;
  theTrail: SingleTrack;
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
            let addVoteTrail = new AddVoteTrail();
            addVoteTrail.entranceId = +(
              document.querySelector("#NavBarAdapter") as HTMLElement
            ).getAttribute("entrance_id")!;
            addVoteTrail.TrailId = props.theTrail.id!;
            addVoteTrail.Vote = +(
              document
                .querySelectorAll(`[id_trail="${props.theTrail.id}"]`)[0]
                .querySelector(".vote")
                ?.querySelector("select") as HTMLSelectElement
            ).value;

            addVoteTrail.Comment = (
              document
                .querySelectorAll(`[id_trail="${props.theTrail.id}"]`)[0]
                .querySelector(".vote")
                ?.querySelector("input") as HTMLInputElement
            ).value;

            console.log(addVoteTrail);

            AddVoteAndResponseTrail(addVoteTrail).then((response) => {
              if (response) {
                //vote ik ok
                GetTrails().then((ans) => {
                  console.log(JSON.stringify(ans));
                  props.setCarrArr(ans);
                  UpdateNavBarScore(10);
                });
              }
            });
          }}
        >
          {/* icon of vote */}
          <FaVoteYea />
        </button>
      </Collapsible>
    </div>
  );
}
