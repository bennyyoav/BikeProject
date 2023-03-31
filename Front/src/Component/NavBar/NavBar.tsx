import { useNavigate } from "react-router-dom";
import {
  GetUserByUserName,
  UpdateEntranceLogOutTime,
} from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { Entrance, User } from "../../GetAndUpdateDataFromFront/dbClasses";
import "./NavBar.css";
import { useState } from "react";
import { TfiCup } from "react-icons/tfi";

export function updateUserData(
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  userName: string
) {
  console.log("at updateUserData");
  console.log("userName", userName);
  GetUserByUserName(userName).then((ans) => {
    if (ans !== undefined) setUser(ans as User); //set user after register
  });
}

export function NavBar(props: {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setUserPerformLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [user, setUser] = useState<User>();

  console.log("at NavBar");
  if (props.userName !== "") {
    if (user === undefined) {
      console.log("userName=", props.userName);
      //after registration
      updateUserData(setUser, props.userName);
    } else if (
      user?.UserName.toLocaleUpperCase() !== props.userName.toLocaleUpperCase()
    ) {
      //changing user (not sure if it could be )
      updateUserData(setUser, props.userName);
    }
  }

  const navigate = useNavigate();

  return (
    //@ts-ignore
    <div id="NavBarAdapter" user_id={user?.id} entrance_id="">
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
              navigate("/MyActivity");
            }}
          >
            My Activity
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
            <div id="yourScoreIs">your score is: {user.score as number}</div>
            <div id="cupIcon">
              <TfiCup />
            </div>
          </div>
          <div id="image Div">
            <img src={user.imageUrl} id="navUserImage" alt="userSmallPicture" />
            <div
              id="abort"
              onClick={() => {
                props.setUserName("");
                setUser(undefined);
                props.setUserPerformLogIn(false);
                const entrance_id = (
                  document.querySelector("#NavBarAdapter") as HTMLElement
                ).getAttribute("entrance_id");
                let entranceIdNum;
                if (entrance_id) {
                  entranceIdNum = +entrance_id;
                }

                console.log("entrance_id", entranceIdNum);
                if (entranceIdNum) {
                  UpdateEntranceLogOutTime(entranceIdNum);
                }
              }}
            >
              abort
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBt1vjw-4CQg8foJBgPhuSbczomrq9o6_aZqowqY&s"></img>
        </div>
      )}
    </div>
  );
}
