
import React from 'react'
import "./SiteRegistration.css"
import { MdAppRegistration } from "react-icons/md";
import {FileUploader} from "./FileUpload.jsx"
export class SiteRegistration extends React.Component{
render(){

  return(
    <div id="RegisterForm"  >
      <div id='registrationFormImg'>
        <img src= "https://mbaction.com/wp-content/uploads/2019/07/israel_03-2018_martin_bissig_1225.jpg" alt="bike rider"></img>
      </div>
      <div id='Registration'>
        <RegistererFormHeader title="Registration" upTitle="Welcome Rider" />
        <Form />
      </div>
    </div>
    
  )
}
}

const RegistererFormHeader = props => (
  <div id="RegistererHeaderTitle">
  <h1 ><MdAppRegistration/> &nbsp;&nbsp;Welcome Ridder &nbsp;&nbsp;<MdAppRegistration/></h1>
 
  <h2 >{props.title}</h2>
  </div>
);


const Form = props => (
 <div>
   <FormInput description="Username" placeholder="Enter your username" type="text" />
   <FormInput description="Password" placeholder="Enter your password" type="password"/>
   <FormInput description="Repeat your password" placeholder="Confirm Password" type="password"/>
   <FileUploader/>
   <FormButton title="Registration"/>
 </div>
);

const FormButton = props => (
<div id="RegistererButton" className="row">
  <button>{props.title}</button>
</div>
);


const FormInput = props => (
<div className="RegistererRow" id={props.id}>
  <label>{props.description}</label>
  <input type={props.type} placeholder={props.placeholder}/>
</div>  
);


export default SiteRegistration;

