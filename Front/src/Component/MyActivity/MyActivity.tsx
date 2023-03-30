import React, { useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";
import { RiUpload2Line } from "react-icons/ri";
import { FaVoteYea } from "react-icons/fa";

import { MdLogin, MdLogout } from "react-icons/md";
import { GetUserActivity } from "../../GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { Activity } from "../../GetAndUpdateDataFromFront/dbClasses";
import "./MyActivity.css";
export function MyActivity(props: { userPerformLogIn: boolean }) {
  let [activityArr, setActivityArr] = useState<Activity[]>([]);
  let [filter, setFilter] = useState<number>(0);

  useEffect(() => {
    if (props.userPerformLogIn === true) {
      GetUserActivity(+user_id!).then((ans) => {
        setActivityArr(ans);
      });
    }
  }, []);

  if (props.userPerformLogIn === false) {
    return <h1>Log in is required to see the contents of the page</h1>;
  }

  const user_id = (
    document.querySelector("#NavBarAdapter") as HTMLElement
  ).getAttribute("user_id");

  function filterFunc() {
    let selectfilter = (document.querySelector("#filter") as HTMLInputElement)
      .value;
    switch (selectfilter) {
      case "All":
        setFilter(0);
        console.log(filter);
        break;
      case "Log in":
        setFilter(1);
        console.log(filter);
        break;
      case "Log out":
        setFilter(2);
        console.log(filter);
        break;
      case "Vote":
        setFilter(3);
        console.log(filter);
        break;
      case "Upload":
        setFilter(4);
        console.log(filter);
        break;
    }
  }

  return (
    <div id="activity">
      <div id="MyActivityHeaderAndSelect">
        <h1 id="MyActivityHeader">My Activity</h1>
        <div id="SelectAndLabel">
          <label>Message filter </label>
          <br></br>
          <select
            name="filter"
            id="filter"
            defaultValue={"All"}
            onChange={filterFunc}
          >
            <option value="All">All</option>
            <option value="Log in"> Log in </option>
            <option value="Log out"> Log out </option>
            <option value="Vote"> Vote </option>
            <option value="Upload"> Upload </option>
          </select>
        </div>
      </div>
      <div>
        {activityArr!.map((curr, i) => (
          <>
            {(filter === 0 ||
              (filter === 1 && curr.activity.includes("Log In")) ||
              (filter === 2 && curr.activity.includes("Log Out")) ||
              (filter === 3 && curr.activity.includes("Vote")) ||
              (filter === 4 && curr.activity.includes("Upload"))) && (
              <ActivityRow
                time={curr.time as unknown as String}
                activity={curr.activity}
                index={i}
              />
            )}
            {/* <div>
              <br />
            </div> */}
          </>
        ))}
      </div>
    </div>
  );
}
function ActivityRow(props: { time: String; activity: String; index: number }) {
  return (
    <div className="activityRow">
      <div className={props.index % 2 ? "bright" : "dark"}>
        <FcAlarmClock />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {props.time} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {props.activity.includes("Log In") && <MdLogin />}
        {props.activity.includes("Upload") && <RiUpload2Line />}
        {props.activity.includes("Log Out") && <MdLogout />}
        {props.activity.includes("Vote") && <FaVoteYea />}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {props.activity}
      </div>
    </div>
  );
}
