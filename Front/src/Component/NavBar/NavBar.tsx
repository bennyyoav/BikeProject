import { useNavigate } from "react-router-dom";
import { GetUserByUserName } from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { User } from "../../GetAndUpdateDataFromFront/dbClasses";
import "./NavBar.css";
import { useState } from "react";
import { TfiCup } from "react-icons/tfi";

export function updateUserData(
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  userName: string
) {
  console.log("at updateUserData");
  GetUserByUserName(userName).then((ans) => {
    if (ans !== undefined) setUser(ans as User); //set user after register
  });
}

export function NavBar(props: { userName: string }) {
  const [user, setUser] = useState<User>();
  console.log("at NavBar");
  console.log(props.userName);

  if (user === undefined) {
    //after registration
    updateUserData(setUser, props.userName);
  } else if (
    user?.UserName.toLocaleUpperCase() !== props.userName.toLocaleUpperCase()
  ) {
    //changing user (not sure if it could be )
    updateUserData(setUser, props.userName);
  }

  const navigate = useNavigate();

  return (
    //@ts-ignore
    <div id="NavBarAdapter" user_id={user?.id}>
      <div className="NavBar">
        <img
          className="bikeIcon"
          src="https://th.bing.com/th/id/OIP.QeH31QoeQuQw_lwzD-adyQHaFu?pid=ImgDet&rs=1"
          alt=""
        />
        <div className="navigates">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          <div
            onClick={() => {
              navigate("/BikeCompetitions");
            }}
          >
            Bike competitions
          </div>
          <div
            onClick={() => {
              navigate("/SiteRegistration");
            }}
          >
            Site Registration{" "}
          </div>
          <div
            onClick={() => {
              navigate("/AboutAs");
            }}
          >
            About As
          </div>
        </div>
      </div>

      {user !== null && user !== undefined ? (
        <div className="userData">
          <div id="helloAndScore">
            <div>hello {user.UserName}</div>
            <div>your score is: {user.score as number}</div>
            <div id="cupIcon">
              <TfiCup />
            </div>
          </div>
          <div id="image Div">
            <img src={user.imageUrl} id="navUserImage" alt="userSmallPicture" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
