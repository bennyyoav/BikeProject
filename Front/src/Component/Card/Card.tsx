import { Bike } from "../../Bike";
import { SingleTrack } from "../../SingleTrack";
import "./Card.css";
import { Grading } from "../Grading/Grading";
import { BikeGradingForm } from "./GradingForm.tsx/BikeGradingForm";
import { SingleGradingForm } from "./GradingForm.tsx/SingleGradingForm";

export function BikeCard(props: {
  theBike: Bike;
  setCarrArr: React.Dispatch<React.SetStateAction<Bike[]>>;
  indexAtArr: number;
  cardArray: Bike[];
}) {
  return (
    <div className="Card">
      <img src={props.theBike.PathToPicture} alt="" />
      <div className="ImageHeader">
        <div className="header">{props.theBike.BikeName} </div>
        <div className="footer">
          Manufacturer is {props.theBike.BikeManufacturer}{" "}
        </div>
      </div>
      <Grading theNum={props.theBike.grade} voteNumber={props.theBike.voters} />
      <BikeGradingForm
        indexAtArr={props.indexAtArr}
        theBike={props.theBike}
        setCarrArr={props.setCarrArr}
        cardArray={props.cardArray}
      />
    </div>
  );
}

export function SingleCard(props: {
  theSingel: SingleTrack;
  setCarrArr: React.Dispatch<React.SetStateAction<SingleTrack[]>>;
  indexAtArr: number;
  cardArray: SingleTrack[];
}) {
  console.log("at SingleCard");

  return (
    <div className="Card">
      <img src={props.theSingel.PathToPicture} alt="" />
      <div className="ImageHeader">
        <div className="header">{props.theSingel.TrailName} </div>
        <div className="footer">Level is {props.theSingel.TrailLevel} </div>
      </div>
      <Grading
        theNum={props.theSingel.grade}
        voteNumber={props.theSingel.voters}
      />
      <SingleGradingForm
        indexAtArr={props.indexAtArr}
        theSingel={props.theSingel}
        setCarrArr={props.setCarrArr}
        cardArray={props.cardArray}
      />
    </div>
  );
}
