import { FocusEventHandler, useState } from "react";
import "./AddPicture.css";
import React from "react";
import { Bike } from "../../Bike";
import { SingleTrack } from "../../SingleTrack";

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
  });
  validityCheck === true ? setDisable(false) : setDisable(true);
}

function CleanForm(setDisable: React.Dispatch<React.SetStateAction<boolean>>) {
  let validityCheck: boolean = true;
  let inputs = document.querySelectorAll("input"); //return node list
  let inputsArr = Array.from(inputs);
  inputsArr.map((input) => {
    input.value = "";
  });
  let selects = document.querySelectorAll("select");
  let selectorArr = Array.from(selects);
  selectorArr.map((input) => {
    input.value = "1";
  });
  setDisable(true);
}

function addInputwithLabel(
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

      {addInputwithLabel("Bike Url", "Add bike picture Url", "BikeUrl", () => {
        EnableDisableSubmit(setDisable);
      })}
      {addInputwithLabel("Bike Name", "Add Bike  Name", "BikeName", () => {
        EnableDisableSubmit(setDisable);
      })}
      {addInputwithLabel(
        "Bike Manufacturer",
        "Add Bike  Manufacturer",
        "BikeManufacturer",
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

          let newBike = [
            ...props.galleryCards,
            {
              id: -1, //todo
              BikeName: `${NameInput.value}`,
              PathToPicture: `${pictureInput.value}`,
              BikeManufacturer: `${manufacturerInput.value}`,
              grade: grade,
              voters: 1,
              EntranceId: 1,
            },
          ];
          props.setGalleryCard(newBike);
          CleanForm(setDisable);
        }}
      />
    </div>
  );
}

export function AddPictureFormSingleTrack(props: {
  galleryCards: SingleTrack[];
  setGalleryCard: React.Dispatch<React.SetStateAction<SingleTrack[]>>;
}) {
  const [disable, setDisable] = useState(true);
  return (
    <div className="addPicture">
      <h4>
        <u>Add Picture</u>{" "}
      </h4>

      {addInputwithLabel(
        "Singel Track Url",
        "Add Single picture Url",
        "SingelTrackUrl",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputwithLabel(
        "Single Track Name",
        "Single Track Name",
        "SingleTrackName",
        () => {
          EnableDisableSubmit(setDisable);
        }
      )}
      {addInputwithLabel(
        "Single Track Level",
        "Add Single Track Level",
        "SingleTrackLevel",
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
          let grade = +(
            document.querySelector(".SingleTrackGrade") as HTMLInputElement
          ).value;
          let newSingleTrack = [
            ...props.galleryCards,
            {
              TrailName: `${
                (document.querySelector(".SingleTrackName") as HTMLInputElement)
                  .value
              }`,
              PathToPicture: `${
                (document.querySelector(".SingelTrackUrl") as HTMLInputElement)
                  .value
              }`,
              TrailLevel: `${
                (
                  document.querySelector(
                    ".SingleTrackLevel"
                  ) as HTMLInputElement
                ).value
              }`,
              grade: grade,
              voters: 1,
              EntranceId: 1,
            },
          ];
          console.log(newSingleTrack);
          props.setGalleryCard(newSingleTrack);
          setDisable(true);
          CleanForm(setDisable);
        }}
      />
    </div>
  );
}
