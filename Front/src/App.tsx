import React, { useState } from "react";
import { NavBar } from "./Component/NavBar/NavBar";
import "./App.css";
import { GallerySelector } from "./Component/GallerySelector/GallerySelector";
import { Route, Routes } from "react-router-dom";
import { AboutAs } from "./Component/AboutAs/AboutAs";
import { MyActivity } from "./Component/MyActivity/MyActivity";
import { SiteRegistration } from "./Component/SiteRegistration/SiteRegistration";
import {} from "./GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";
import { LogIN } from "./Component/LogIn/LogIn";
import CommentFullPage from "./Component/CommentFullPageBikes/CommentFullPageBikes";
import CommentFullPageTrail from "./Component/CommentFullPageTrails/CommentFullPageTrails";

function App() {
  var [userPerformLogIn, setUserPerformLogIn] = useState<boolean>(false);
  var [userName, setUserName] = useState<string>("");
  return (
    <div className="App">
      <NavBar
        userName={userName}
        setUserName={setUserName}
        setUserPerformLogIn={setUserPerformLogIn}
      />
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

        <Route
          path="/MyActivity"
          element={<MyActivity userPerformLogIn={userPerformLogIn} />}
        />
        <Route path="/siteRegistration" element={<SiteRegistration />} />

        <Route
          path="/CommentFullPage"
          element={<MyActivity userPerformLogIn={userPerformLogIn} />}
        />
        <Route
          path="/CommentFullPage/:id"
          element={<CommentFullPage userPerformLogIn={userPerformLogIn} />}
        />
        <Route
          path="/CommentFullPageTrail/:id"
          element={<CommentFullPageTrail userPerformLogIn={userPerformLogIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
