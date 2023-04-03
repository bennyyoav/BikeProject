import "./Gallery.css";

import { BikeCard, SingleCard } from "../Card/Card";
import { Bike } from "../../Bike";
import { Trail } from "../../SingleTrack";

export function Gallery(props: {
  galleryName: string;
  cards: (Bike | Trail)[];
  setGalleryArr:
    | React.Dispatch<React.SetStateAction<Trail[]>>
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
            theTrail={curr as Trail}
            setCarrArr={
              props.setGalleryArr as React.Dispatch<
                React.SetStateAction<Trail[]>
              >
            }
            indexAtArr={i}
            cardArray={props.cards as Trail[]}
          />
        ))}
      </div>
    </div>
  );
}
