import { useEffect, useState } from "react";
import { AddPictureFormBike, AddPictureFormSingleTrack } from "../AddPicture/AddPicture";
import { Gallery } from "../Gallery/Gallery";
import "./GallerySelector.css"
import { Bike } from "../../Bike"
import { SingleTrack } from "../../SingleTrack";


export  function GallerySelector() {
  let [bikeArry,setBikeArry]=useState<Bike[]>([]);
  let [singleTrackArray,setSingleTreckArray]=useState<SingleTrack[]>([]);
  useEffect(()=>{
       
          fetch('bikes.json')
            .then(function(response){
              console.log(response)
              return response.json();
            })
            .then(function(myJson) {
              setBikeArry(myJson);
              
            });
            fetch('SingleTracks.json')
            .then(function(response){
              console.log(response)
              return response.json();
            })
            .then(function(myJson) {
              setSingleTreckArray(myJson);
              
            });
            


        },[])

     
    let [galleryTitle, setGalleryTitle]= useState("Mountains Bikes Galley");
 
   
    function UpdateHeader()
    {
      let userSelect = (document.querySelector(" #screenToSelect") as HTMLInputElement).value; 
         switch (userSelect)
          {
            case 'bikeGallery':
                setGalleryTitle('Mountains Bikes Galley');
                break;

            case 'israelMountainBikingTrails':
                setGalleryTitle('Israel Mountain Biking Trails');
                break;
        
         }

        
    }
   
    
      function GenerateGallerySelector(props:{default:string}) {
      return (
        <div id="labelAndSelect">
        <label >Choose a Gallery</label><br></br>
        <select name="screenToSelect" id="screenToSelect" defaultValue={props.default} onChange={UpdateHeader } >
            <option value="bikeGallery">Bikes Gallery</option>
            <option value="israelMountainBikingTrails">Israel Mountain Biking Trails</option>
        </select>
    </div>
      )
    }
    

    
    if (galleryTitle==='Mountains Bikes Galley')
    return (
      <div className="GallerySelector">
         <GenerateGallerySelector default="bikeGallery"/>
        <h1>{galleryTitle}</h1>
        {<Gallery galleryName={galleryTitle} cards={bikeArry} setGalleryArr={setBikeArry  }/>}  
        <AddPictureFormBike  galleryCards={bikeArry} setGalleryCard={setBikeArry}/>
      </div>
    )
    else
    return (
      <div className="GallerySelector">
        <GenerateGallerySelector default="israelMountainBikingTrails"/>
      <h1>{galleryTitle}</h1>
     
      {<Gallery galleryName={galleryTitle} cards={singleTrackArray} setGalleryArr={setSingleTreckArray }/>}  
      <AddPictureFormSingleTrack  galleryCards={singleTrackArray} setGalleryCard={setSingleTreckArray}/>
    </div>
  )

  }


  