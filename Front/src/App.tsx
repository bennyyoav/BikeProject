import React, { useState } from "react";
import { NavBar } from "./Component/NavBar/NavBar";
import "./App.css";
import { GallerySelector } from "./Component/GallerySelector/GallerySelector";
import { Route, Routes } from "react-router-dom";
import { AboutAs } from "./Component/AboutAs/AboutAs";
import { BikeCompetitions } from "./Component/BikeCompetitions/BikeCompetitions";
import { SiteRegistration } from "./Component/SiteRegistration/SiteRegistration";
import {} from "./GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { LogIN } from "./Component/LogIn/LogIn";

function App() {
  let [userPerformLogIn, setUserPerformLogIn] = useState<boolean>(false);
  let [userName, setUserName] = useState<string>("");
  return (
    <div className="App">
      <NavBar userName={userName} />
      <Routes>
        {userPerformLogIn === true && (
          <Route path="/" element={<GallerySelector />} />
        )}
        {userPerformLogIn === false && (
          <Route
            path="/"
            element={
              <LogIN
                setUserPerformLogIn={setUserPerformLogIn}
                setUserName={setUserName}
              />
            }
          />
        )}
        <Route
          path="/AboutAs"
          element={<AboutAs userPerformLogIn={userPerformLogIn} />}
        />
        <Route path="/BikeCompetitions" element={<BikeCompetitions />} />
        <Route path="/siteRegistration" element={<SiteRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
