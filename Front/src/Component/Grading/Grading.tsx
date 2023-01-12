import React from 'react'
import "./Grading.css"





export  function Star() {
  return (
    <img src="https://www.bing.com/th?id=OIP.xLd0JTL0v-9ZzPnU1whA4QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" alt="Star" />
    
  )
}

export function Stars(props:{theNum:number})
{

    return(
       <div>{[...Array(Math.round (props.theNum))].map((elementInArray, index) => (<Star key={index}/>) )}</div>
       );
    
}


export function Grading(props:{theNum:number})
{
  console.log("at grading");
  console.log(props.theNum);
  return (

      <div className='grading'>
          <div>Grade:</div>
        <Stars theNum={props.theNum}/>
         
      </div>
  )
}



