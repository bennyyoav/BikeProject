import { Bike } from "../../Bike"
import {  SingleTrack } from "../../SingleTrack"
import "./Card.css"
import {Grading} from "../Grading/Grading"
export function BikeCard(props:{
  theBike:Bike,setCarrArr: React.Dispatch<React.SetStateAction<Bike[]>>,indexAtArr:number,cardArray:Bike[]})
   {
    
  return (
    <div className="Card">
      <img src={props.theBike.picture} alt="" />
      <div className="ImageHeader">
        <div className="header">{props.theBike.name} </div>
        <div className="footer">Manufacturer is {props.theBike.manufacturer} </div>
      </div>
      <Grading theNum={props.theBike.grade}/>
      <div className="vote">
        <label>Score the bikes</label>  
        
          <select name="Bike Grade" className={`BikeGrade${props.indexAtArr}`}  >
            
            {[...Array(5)].map((curr, index) => ( <option value={index+1}  key={index}>{index+1}</option>) )}
          </select>
          <button className="VoteButton" onClick={()=>{
            //let tempArr=[...props.cardArray];
            let tempArr = props.cardArray.slice();
            
            let bikeWithNewGrade=props.theBike;
            
            //calc aver grade
            let votersNum=Number(bikeWithNewGrade.voters);
            let oldVoteAverageNumber=bikeWithNewGrade.grade;
            let newVote=Number((document.querySelector(`.BikeGrade${props.indexAtArr}`) as HTMLInputElement).value)
            //Average CALC
            bikeWithNewGrade.grade=(oldVoteAverageNumber*votersNum+newVote)/(votersNum+1);
            bikeWithNewGrade.voters+=1;
            tempArr.splice(props.indexAtArr,1,bikeWithNewGrade)
            props.setCarrArr([...tempArr] );
            }}>vote</button>
          <label>Number of voters {props.theBike.voters}</label> 
        </div>
      
      
    </div>
  )
}

export function SingleCard(props:{
  theSingel:SingleTrack ,setCarrArr: React.Dispatch<React.SetStateAction<SingleTrack[]>>,indexAtArr:number,cardArray:SingleTrack[]})

  
 {
  console.log("at SingleCard");


  return (
    <div className="Card">
      <img src={props.theSingel.picture} alt="" />
      <div className="ImageHeader">
        <div className="header">{props.theSingel.name} </div>
        <div className="footer">Level is {props.theSingel.level} </div>
      </div>
      <Grading theNum={props.theSingel.grade}/>
      <div className="vote">
        <label>Score the Trail</label>  
        
          <select name="Bike Grade" className={`BikeGrade${props.indexAtArr}`}  >
            
            {[...Array(5)].map((curr, index) => ( <option value={index+1}  key={index}>{index+1}</option>) )}
          </select>
          <button className="VoteButton" onClick={()=>{
            let tempArr=[...props.cardArray];
            
            
            let singleWithNewGrade=props.theSingel;
            
            //calc aver grade
            let votersNum=Number(singleWithNewGrade.voters);
            let oldVoteAverageNumber=singleWithNewGrade.grade;
            let newVote=Number((document.querySelector(`.BikeGrade${props.indexAtArr}`) as HTMLInputElement).value)
            //Average CALC
            singleWithNewGrade.grade=(oldVoteAverageNumber*votersNum+newVote)/(votersNum+1);
            singleWithNewGrade.voters+=1;
            tempArr.splice(props.indexAtArr,1,singleWithNewGrade)
        
            props.setCarrArr([...tempArr] );
            
            }}>vote</button>
          <label>Number of voters {props.theSingel.voters}</label> 
        </div>
    </div>
  )
}
