import "./Gallery.css";

import { BikeCard, SingleCard } from "../Card/Card";
import { Bike } from "../../Bike";
import { SingleTrack } from "../../SingleTrack";

export function Gallery(props: {
  galleryName: string;
  cards: (Bike | SingleTrack)[];
  setGalleryArr:
    | React.Dispatch<React.SetStateAction<SingleTrack[]>>
    | React.Dispatch<React.SetStateAction<Bike[]>>;
}) {
  if (
    props.galleryName.toLocaleLowerCase() ==
    "Mountains Bikes Galley".toLocaleLowerCase()
  ) {
    return (
      <div className="BikesGallery">
        <div className="Images">
          {props.cards.map((curr, i) => (
            <BikeCard
              key={i}
              theBike={curr as Bike}
              setCarrArr={
                props.setGalleryArr as React.Dispatch<
                  React.SetStateAction<Bike[]>
                >
              }
              indexAtArr={i}
              cardArray={props.cards as Bike[]}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="BikesGallery">
      <div className="Images">
        {props.cards.map((curr, i) => (
          <SingleCard
            key={i}
            theSingel={curr as SingleTrack}
            setCarrArr={
              props.setGalleryArr as React.Dispatch<
                React.SetStateAction<SingleTrack[]>
              >
            }
            indexAtArr={i}
            cardArray={props.cards as SingleTrack[]}
          />
        ))}
      </div>
    </div>
  );
}
