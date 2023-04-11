import { FocusEventHandler, useState } from "react";
import "./AddPicture.css";
import React from "react";
import { Bike } from "../../Bike";
import { Trail } from "../../SingleTrack";
import {
  AddBike,
  AddScoreToUserByUserID,
  AddTrail,
  AddVoteAndResponseBike,
  AddVoteAndResponseTrail,
  GetBikes,
  GetTrails,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { UpdateNavBarScore } from "../Card/GradingForm.tsx/BikeGradingForm";
import { VoteBike, VoteTrail } from "../../GetAndUpdateDataFromFront/dbClasses";

function EnableDisableSubmit(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
) {
  let validityCheck: boolean = true;
  //let inputs = document.querySelectorAll(`input`); //return node list
  let inputs = document.querySelectorAll(
    `.addPicture input `
  ) as unknown as NodeListOf<HTMLInputElement>; //return node list
  let inputsArr = Array.from(inputs);

  inputsArr.map((input) => {
    if (input.value.length === 0) {
      console.log(input.name);
      validityCheck = false;
    }
    return 1; //return only to quite the warning
  });
  validityCheck === true ? setDisable(false) : setDisable(true);
}

function CleanForm(setDisable: React.Dispatch<React.SetStateAction<boolean>>) {
  let inputs = document.querySelectorAll("input"); //return node list
  let inputsArr = Array.from(inputs);
  inputsArr.map((input) => {
    input.value = "";
    return 1; //return only to quite the warning
  });
  let selects = document.querySelectorAll("select");
  let selectorArr = Array.from(selects);
  selectorArr.map((input) => {
    input.value = "1";
    return 1; //return only to quite the warning
  });
  setDisable(true);
}

function addInputWithLabel(
  labelName: string,
  placeholder: string,
  id: string,
  onChangeFunc: FocusEventHandler<HTMLInputElement>
) {
  return (
    <div className="inputClass">
      <label>{labelName}</label>
      <input
        placeholder={`${placeholder} ${"  "}`}
        className={id}
        onChange={onChangeFunc}
      />
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export function AddPictureFormBike(props: {
  galleryCards: Bike[];
  setGalleryCard: React.Dispatch<React.SetStateAction<Bike[]>>;
}) {
  const [disable, setDisable] = useState(true);

  return (
    <div className="addPicture">
      <h4>
        <u>Add Picture</u>{" "}
      </h4>

      {addInputWithLabel("Bike Url", "Add bike picture Url", "BikeUrl", () => {
        EnableDisableSubmit(setDisable);
      })}
      {addInputWithLabel("Bike Name", "Add Bike  Name", "BikeName", () => {
        EnableDisableSubmit(setDisable);
      })}
      {addInputWithLabel(
        "Bike Manufacturer",
        "Add Bike  Manufacturer",
        "BikeManufacturer",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputWithLabel(
        "Bike Comment",
        "Add Bike Comment",
        "BikeComment",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}

      <div className="inputClass">
        <label>Bike Grade</label>
        <select name="Bike Grade" className="BikeGrade">
          {[...Array(5)].map((curr, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <input
        type="button"
        value="Submit"
        disabled={disable}
        onClick={(event) => {
          let gradeFromSelector = document.querySelector(
            ".BikeGrade"
          ) as HTMLSelectElement;
          let grade = +gradeFromSelector.value;
          let NameInput = document.querySelector(
            ".BikeName"
          ) as HTMLInputElement;
          let pictureInput = document.querySelector(
            ".BikeUrl"
          ) as HTMLInputElement;
          let manufacturerInput = document.querySelector(
            ".BikeManufacturer"
          ) as HTMLInputElement;
          let BikeComment = document.querySelector(
            ".BikeComment"
          ) as HTMLInputElement;
          console.log("BikeComment", BikeComment.value);
          let entranceId = +(
            document.querySelector("#NavBarAdapter") as HTMLElement
          ).getAttribute("entrance_id")!;
          const user_id = (
            document.querySelector("#NavBarAdapter") as HTMLElement
          ).getAttribute("user_id")!;
          AddBike(
            entranceId,
            NameInput.value,
            manufacturerInput.value,
            pictureInput.value
          ).then((ans) => {
            let voteBike = new VoteBike();
            voteBike.entranceId = entranceId;
            voteBike.BikeId = ans.bikeID;
            voteBike.Vote = grade;
            voteBike.Comment = BikeComment.value;
            AddVoteAndResponseBike(voteBike).then(() => {
              GetBikes().then((ans) => {
                props.setGalleryCard(ans);
                CleanForm(setDisable);
              });
            });
            AddScoreToUserByUserID(user_id, 20);
            UpdateNavBarScore(20); //to see the diff without out and in
          });
        }}
      />
    </div>
  );
}

export function AddPictureFormSingleTrack(props: {
  galleryCards: Trail[];
  setGalleryCard: React.Dispatch<React.SetStateAction<Trail[]>>;
}) {
  const [disable, setDisable] = useState(true);
  return (
    <div className="addPicture">
      <h4>
        <u>Add Picture</u>{" "}
      </h4>

      {addInputWithLabel(
        "Single Track Url",
        "Add Single picture Url",
        "SingleTrackUrl",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputWithLabel(
        "Single Track Name",
        "Single Track Name",
        "SingleTrackName",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputWithLabel(
        "Single Track Level",
        "Add Single Track Level",
        "SingleTrackLevel",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputWithLabel(
        "Trail Comment",
        "Add Bike Trail",
        "TrailComment",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      <div className="inputClass">
        <label>Single Grade</label>
        <select name="SingleTrackGrade" className="SingleTrackGrade">
          {[...Array(5)].map((curr, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <input
        type="button"
        value="Submit"
        disabled={disable}
        onClick={(event) => {
          let gradeFromSelector = document.querySelector(
            ".SingleTrackGrade"
          ) as HTMLSelectElement;
          let grade = +gradeFromSelector.value;
          let NameInput = document.querySelector(
            ".SingleTrackName"
          ) as HTMLInputElement;
          let pictureInput = document.querySelector(
            ".SingleTrackUrl"
          ) as HTMLInputElement;
          let SingleTrackLevel = document.querySelector(
            ".SingleTrackLevel"
          ) as HTMLInputElement;
          let TrailComment = document.querySelector(
            ".TrailComment"
          ) as HTMLInputElement;
          console.log("TrailComment", TrailComment.value);
          let entranceId = +(
            document.querySelector("#NavBarAdapter") as HTMLElement
          ).getAttribute("entrance_id")!;
          const user_id = (
            document.querySelector("#NavBarAdapter") as HTMLElement
          ).getAttribute("user_id")!;
          AddTrail(
            entranceId,
            NameInput.value,
            SingleTrackLevel.value,
            pictureInput.value
          ).then((ans) => {
            let voteTrail = new VoteTrail();
            voteTrail.entranceId = entranceId;
            voteTrail.TrailId = ans.trailId;
            voteTrail.Vote = grade;
            voteTrail.Comment = TrailComment.value;
            AddVoteAndResponseTrail(voteTrail).then(() => {
              GetTrails().then((ans) => {
                props.setGalleryCard(ans);
                CleanForm(setDisable);
              });
            });
            AddScoreToUserByUserID(user_id, 20);
            UpdateNavBarScore(20); //to see the diff without out and in
          });
        }}
      />
    </div>
  );
}
