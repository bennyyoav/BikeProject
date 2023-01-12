 import "./AboutAs.css"
import React from 'react'
import pic from"./MyPicture.jpeg"
export  function AboutAs() {
  return (
    <div className="AboutAs">
       
       <h1>Get caught up in the mountain biking craze, your place is with us</h1>
       <div className="imgDiv">
          <img className="myImage" src={pic} alt="My Picture"/>
          <div className="parags">
                <div className="parg1">
                  <h2>About me</h2>
                  <text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias fuga, et rem dicta aperiam impedit rerum expedita? Cum debitis veniam id, incidunt provident laboriosam! Molestias nostrum unde rerum vel a voluptates ex, ab totam cupiditate. Minus similique magni, cum tempore accusantium repudiandae sunt iste veniam iusto debitis ipsum quasi mollitia deserunt modi excepturi nemo nisi? Molestiae recusandae impedit magnam excepturi voluptatum saepe sint aliquid! Labore sequi corrupti quas debitis rem optio assumenda asperiores. Reiciendis iusto odit ex, ullam molestias aperiam error cumque debitis corporis animi earum aspernatur!</text>
                </div>
                <div className="parag2">
                <h2>Why do you have to register on the site?</h2>
                <ul>
                  <li>Daily information on the riding routes</li>
                  <li>Information about all the mountain bike competitions in Israel</li>
                  <li>A huge database of riders that you can consult with and ride with</li>
                  <li>Tips for riding on hot summer days and after rains</li>
                
                </ul>
                </div>
                
          </div>
      </div>
    </div>
  )
}
