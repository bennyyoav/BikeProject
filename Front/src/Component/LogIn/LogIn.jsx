
import React from 'react'
import "./LogIn.css"
import { MdDirectionsBike } from "react-icons/md";

export class LogIN extends React.Component{
render(){

  return(
    <div className='loginFormBody'>
    <div id="loginForm"  >
      <FormHeader title="Login" upTitle="Welcome Rider" />
      <Form />
      <RegisterHyperLink/>
    </div>
    </div>
  )
}
}

const FormHeader = props => (
  <div id="headerTitle">
  <h1 ><MdDirectionsBike/> &nbsp;&nbsp;Welcome Ridder &nbsp;&nbsp;<MdDirectionsBike/></h1>
 
  <h2 >{props.title}</h2>
  </div>
);


const Form = props => (
 <div>
   <FormInput description="Username" placeholder="Enter your username" type="text" />
   <FormInput description="Password" placeholder="Enter your password" type="password"/>
   <FormButton title="Log in"/>
 </div>
);

const FormButton = props => (
<div id="button" class="row">
  <button>{props.title}</button>
</div>
);

const RegisterHyperLink = props => (
  <div id ="Register" >
    <a href="SiteRegistration">Registration to the site</a>
    <link rel="stylesheet" Registration to the site href="" />
  </div>
  );

const FormInput = props => (
<div class="row">
  <label>{props.description}</label>
  <input type={props.type} placeholder={props.placeholder}/>
</div>  
);




export default LogIN
//ReactDOM.render(<App />, document.getElementById('container'));