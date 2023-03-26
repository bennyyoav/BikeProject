import React, { useEffect, useState } from "react";
import "./SiteRegistration.css";
import { MdAppRegistration } from "react-icons/md";
import { UserImageUpload, manAvatarURL } from "./UserImageUpload";
import {
  AddUser,
  IsUserExist,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { User } from "../../GetAndUpdateDataFromFront/dbClasses";
import { imageFormData } from "./UserImageUpload";
const BACK_SERVER = "localhost";

enum FormErrorText {
  "Some of the form inputs are empty",
  "password is not equal to  repeat password",
  "Form is correct",
  "user is already exist",
  "The registration to the site succeeded",
  "error occurred when registering for the site",
}

function UpdateFormsErrorData(data: FormErrorText) {
  console.log("at UpdateFormsErrorData");
  const formError = document.querySelector("#FormsError") as HTMLElement;
  formError.innerHTML = FormErrorText[data];

  console.log(FormErrorText[data]);
  sessionStorage.setItem("formValues", JSON.stringify(data));

  switch (data) {
    case FormErrorText["Some of the form inputs are empty"]: {
      formError.style.color = "orange";
      break;
    }
    case FormErrorText["password is not equal to  repeat password"]:
    case FormErrorText["user is already exist"]:
    case FormErrorText["error occurred when registering for the site"]: {
      formError.style.color = "red";
      break;
    }
    case FormErrorText["Form is correct"]:
    case FormErrorText["The registration to the site succeeded"]: {
      formError.style.color = "green";
      break;
    }
  }
}

export function SiteRegistration() {
  const [image, setImage] = useState<FormData>();
  useEffect(() => {
    const form = sessionStorage.getItem("formValues");

    if (form) {
      const data = JSON.parse(form);
      console.log("at on load");
      console.log(data);
      UpdateFormsErrorData(data);
    }
  });

  return (
    <div id="RegisterForm">
      <div id="registrationFormImg">
        <img
          src="https://mbaction.com/wp-content/uploads/2019/07/israel_03-2018_martin_bissig_1225.jpg"
          alt="bike rider"
        ></img>
      </div>
      <div id="Registration">
        <RegistererFormHeader title="Registration" upTitle="Welcome Rider" />
        <Form imageFormDataSet={setImage} image={image} />
      </div>
    </div>
  );
}

function FormButton(props: { title: string }) {
  return (
    <div className="row">
      <button
        className="Button"
        id="RegistererButtonDisable"
        onClick={() => {
          Registration();
        }}
      >
        {props.title}
      </button>
      <div id="FormsError"></div>
    </div>
  );
}
function ResetForm() {
  (document.querySelector(".Button") as HTMLButtonElement).disabled = true;
  (document.querySelector(".Button") as HTMLButtonElement).id =
    "RegistererButtonDisable";
  (document.querySelector("#MaleRadioButton") as HTMLInputElement).checked =
    true;
  (document.querySelector("#FemaleRadioButton") as HTMLInputElement).checked =
    false;

  (document.querySelector("#userImage") as HTMLImageElement).src = manAvatarURL;
  (document.querySelector("#uploadImageStatus") as HTMLElement).innerHTML =
    "Image not Loaded";
  (document.querySelector("#uploadImageStatus") as HTMLElement).style.color =
    "orange";
  (document.querySelector("#userNameFile") as HTMLInputElement).value = "";
  (document.querySelector("#UserName") as HTMLInputElement).value = "";
  (document.querySelector("#Password") as HTMLInputElement).value = "";
  (document.querySelector("#RepeatPassword") as HTMLInputElement).value = "";
}

function Registration() {
  const userName = (document.querySelector("#UserName") as HTMLInputElement)
    .value;
  const password = (document.querySelector("#Password") as HTMLInputElement)
    .value;

  let userImageUrl = (document.querySelector("#userImage") as HTMLImageElement)
    .src;

  IsUserExist(userName).then((result) => {
    if (result === 1) {
      console.log("user already exist ");

      UpdateFormsErrorData(FormErrorText["user is already exist"]);
      return;
    } else {
      if (imageFormData.has("file") === false) {
        //upload user with default image
        //user did not add picture
        AddUser(
          new User(
            "firstName",
            "lastName",
            userName,
            password,
            userImageUrl,
            10
          )
        )
          .then(() => {
            UpdateFormsErrorData(
              FormErrorText["The registration to the site succeeded"]
            );
          })
          .catch((error) => {
            console.log(error);
            UpdateFormsErrorData(
              FormErrorText["error occurred when registering for the site"]
            );
          });
      } else {
        //upload user with  image
        handleSubmitImage(imageFormData)?.then((response) => {
          response.json().then((response) => {
            console.log("response=", response);
            userImageUrl = `./${response.file
              .split("public\\")[1]
              .replaceAll("\\", "/")}`;
            AddUser(
              new User(
                "firstName",
                "lastName",
                userName,
                password,
                userImageUrl,
                10
              )
            )
              .then((ans) => {
                console.log(ans);
                UpdateFormsErrorData(
                  FormErrorText["The registration to the site succeeded"]
                );
              })
              .catch((error) => {
                console.log(error);
                UpdateFormsErrorData(
                  FormErrorText["error occurred when registering for the site"]
                );
              });
          });
        });
      }
    }
  });

  ResetForm();
}

function RegistererFormHeader(props: { title: string; upTitle: string }) {
  return (
    <div id="RegistererHeaderTitle">
      <h1>
        <MdAppRegistration /> &nbsp;&nbsp;{props.upTitle} &nbsp;&nbsp;
        <MdAppRegistration />
      </h1>

      <h2>{props.title}</h2>
    </div>
  );
}

function FormInput(props: {
  description: string;
  type: string;
  placeholder: string;
  idOfInput: string;
}) {
  return (
    <div className="RegistererRow">
      <label>{props.description}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.idOfInput}
        onMouseLeave={(event) => checkForm()}
      />
    </div>
  );
}

function checkForm() {
  const userName = document.querySelector("#UserName") as HTMLInputElement;
  const password = document.querySelector("#Password") as HTMLInputElement;
  const repeatPassword = document.querySelector(
    "#RepeatPassword"
  ) as HTMLInputElement;
  let formError = document.querySelector("#FormsError") as HTMLElement;

  if (
    userName.value.length === 0 ||
    password.value.length === 0 ||
    repeatPassword.value.length === 0
  ) {
    (document.querySelector(".Button") as HTMLButtonElement).id =
      "RegistererButtonDisable";
    UpdateFormsErrorData(FormErrorText["Some of the form inputs are empty"]);
    formError.style.color = "orange";
    (document.querySelector(".Button") as HTMLButtonElement).disabled = true;
    return;
  }
  if (repeatPassword.value !== password.value) {
    // (document.querySelector(".Button") as HTMLButtonElement).id =
    UpdateFormsErrorData(
      FormErrorText["password is not equal to  repeat password"]
    );
    formError.style.color = "red";
    (document.querySelector(".Button") as HTMLButtonElement).disabled = true;
    return;
  }

  (document.querySelector(".Button") as HTMLButtonElement).id =
    "RegistererButtonEnable";
  UpdateFormsErrorData(FormErrorText["Form is correct"]);
  formError.style.color = "green";
  (document.querySelector(".Button") as HTMLButtonElement).disabled = false;
}

function Form(props: {
  imageFormDataSet: React.Dispatch<React.SetStateAction<FormData | undefined>>;
  image: FormData | undefined;
}) {
  return (
    <div>
      <FormInput
        description="Username"
        idOfInput="UserName"
        placeholder="Enter your username"
        type="text"
      />
      <FormInput
        description="Password"
        idOfInput="Password"
        placeholder="Enter your password"
        type="password"
      />
      <FormInput
        description="Repeat your password"
        idOfInput="RepeatPassword"
        placeholder="Confirm Password"
        type="password"
      />
      <UserImageUpload imageFormDataSet={props.imageFormDataSet} />

      <FormButton title="Registration" />
    </div>
  );
}

function handleSubmitImage(image: FormData) {
  console.log("image =", image);
  if (imageFormData !== undefined) {
    return fetch(`http://${BACK_SERVER}/users/getUserImage`, {
      method: "POST",
      body: image,
    });
  }
}

export default SiteRegistration;
