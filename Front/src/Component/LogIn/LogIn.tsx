import React from "react";
import "./LogIn.css";
import { MdDirectionsBike } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  addEntrance,
  AddScoreToUser,
  CheckPassword,
  GetUserByUserName,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { Entrance, User } from "../../GetAndUpdateDataFromFront/dbClasses";

export function LogIN(props: {
  setUserPerformLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="loginFormBody">
      <div id="loginForm">
        <FormHeader title="Login" upTitle="Welcome Rider" />
        <Form
          setUserPerformLogIn={props.setUserPerformLogIn}
          setUserName={props.setUserName}
        />
        <RegisterHyperLink />
      </div>
    </div>
  );
}

const FormHeader = (props: { upTitle: string; title: string }) => (
  <div id="headerTitle">
    <h1>
      <MdDirectionsBike /> &nbsp;&nbsp;{props.upTitle} &nbsp;&nbsp;
      <MdDirectionsBike />
    </h1>

    <h2>{props.title}</h2>
  </div>
);

const Form = (props: {
  setUserPerformLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div>
    <FormInput
      id="userName"
      description="Username"
      placeholder="Enter your username"
      type="text"
    />
    <FormInput
      id="password"
      description="Password"
      placeholder="Enter your password"
      type="password"
    />
    <FormButton
      title="Log in"
      setUserPerformLogIn={props.setUserPerformLogIn}
      setUserName={props.setUserName}
    />
    <div id="FormsError"></div>
  </div>
);
function checkForm() {
  let userName = (document.querySelector("#userName") as HTMLInputElement)
    .value;
  let password = (document.querySelector("#password") as HTMLInputElement)
    .value;

  return CheckPassword(userName, password);
}

const LogIn = (
  setUserPerformLogIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>
) => {
  let userName = (document.querySelector("#userName") as HTMLInputElement)
    .value;
  checkForm().then((ans) => {
    if (ans) {
      AddScoreToUser(userName, 10).then(() => {
        setUserPerformLogIn(true);
        setUserName(userName);

        GetUserByUserName(userName).then((ans) => {
          if (ans !== undefined) {
            const userId = (ans as User).id;
            addEntrance(userId!, " ").then((ans) => {
              console.log("ans", ans);
              console.log("entrancedId", ans);
              (
                document.querySelector("#NavBarAdapter") as HTMLElement
              ).setAttribute("entrance_id", ans);
            });
          } //set user after register
        });

        // addEntrance()
      });
    } else {
      let formsError = document.querySelector("#FormsError") as HTMLElement;
      formsError.innerHTML = "Incorrect user name or password";
      formsError.style.color = "red";
    }
  });
};
const FormButton = (props: {
  title: string;
  setUserPerformLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="row">
    <button
      id="logInButton"
      onClick={(event) => {
        LogIn(props.setUserPerformLogIn, props.setUserName);
      }}
    >
      {props.title}
    </button>
  </div>
);

const RegisterHyperLink = () => (
  <div id="Register">
    <Link to={"/SiteRegistration"}>
      <span>Registration to the site</span>
    </Link>
  </div>
);

const FormInput = (props: {
  type: string;
  description: string;
  placeholder: string;
  id: string;
}) => (
  <div className="row">
    <label>{props.description}</label>
    <input id={props.id} type={props.type} placeholder={props.placeholder} />
  </div>
);

export default LogIN;
