import React from "react";
import { NavBar } from "./Component/NavBar/NavBar";
import "./App.css";
import { GallerySelector } from "./Component/GallerySelector/GallerySelector";
import { Route, Routes } from "react-router-dom";
import { AboutAs } from "./Component/AboutAs/AboutAs";
import { BikeCompetitions } from "./Component/BikeCompetitions/BikeCompetitions";
import { SiteRegistration } from "./Component/SiteRegistration/SiteRegistration";
import {} from "./GetAndUpdateDataFromFront/GetAndUpdateDataFromBack";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<GallerySelector />} />
        <Route path="/AboutAs" element={<AboutAs />} />
        <Route path="/BikeCompetitions" element={<BikeCompetitions />} />
        <Route path="/siteRegistration" element={<SiteRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
