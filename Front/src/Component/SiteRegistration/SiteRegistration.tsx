import React from "react";
import "./SiteRegistration.css";
import { MdAppRegistration } from "react-icons/md";
import { UserImageUpload, manAvatarURL } from "./UserImageUpload";
import {
  AddUser,
  IsUserExist,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { User } from "../../GetAndUpdateDataFromFront/dbClasses";

export function SiteRegistration() {
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
        <Form />
      </div>
    </div>
  );

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

    (document.querySelector("#userImage") as HTMLImageElement).src =
      manAvatarURL;
    (document.querySelector("#uploadImageStatus") as HTMLElement).innerHTML =
      "Image not Loaded";
    (document.querySelector("#uploadImageStatus") as HTMLElement).style.color =
      "orange";
    (document.querySelector("#userNameFile") as HTMLInputElement).value = "";
  }

  function Registration() {
    const userName = document.querySelector("#UserName") as HTMLInputElement;
    const password = document.querySelector("#Password") as HTMLInputElement;
    const RepeatPassword = document.querySelector(
      "#RepeatPassword"
    ) as HTMLInputElement;
    const userImageUrl = document.querySelector(
      "#userImage"
    ) as HTMLImageElement;
    let formError = document.querySelector("#FormsError") as HTMLElement;

    IsUserExist(userName.value).then((result) => {
      if (result === 1) {
        console.log("user already exist ");
        formError.style.color = "red";
        formError.innerHTML = "user is already exist";
        return;
      }
      let ans = AddUser(
        new User(
          "firstName",
          "lastName",
          userName.value,
          password.value,
          userImageUrl.src,
          10
        )
      );

      console.log(ans);

      formError.style.color = "green";
      formError.innerHTML = "The registration to the site succeeded";
      userName.value = "";
      password.value = "";
      RepeatPassword.value = "";

      ResetForm();
    });
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
      formError.innerHTML = "Some of the form inputs are empty";
      formError.style.color = "orange";
      (document.querySelector(".Button") as HTMLButtonElement).disabled = true;
      return;
    }
    if (repeatPassword.value !== password.value) {
      (document.querySelector(".Button") as HTMLButtonElement).id =
        formError.innerHTML = "password is not equal to  repeat password";
      formError.style.color = "red";
      (document.querySelector(".Button") as HTMLButtonElement).disabled = true;
      return;
    }

    (document.querySelector(".Button") as HTMLButtonElement).id =
      "RegistererButtonEnable";

    formError.innerHTML = "Form is correct";
    formError.style.color = "green";
    (document.querySelector(".Button") as HTMLButtonElement).disabled = false;
  }

  function Form(props: {}) {
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
        <UserImageUpload />

        <FormButton title="Registration" />
      </div>
    );
  }
}
export default SiteRegistration;
