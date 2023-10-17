import React from "react";

//react router dom
import { Route, Routes } from "react-router-dom";

//components
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Home from "./assets/components/Home";

import Votados from "./assets/components/Votados";
import AddVoter from "./assets/components/pages/AddVoter";
import AddCoordinator from "./assets/components/pages/addCoordinator";
import DeleteVoterPage from "./assets/components/DeleteVoterPage";
import AddSchool from "./assets/components/pages/AddSchool";
import DelCoordinator from "./assets/components/pages/DelCoordinator";
import DelSchool from "./assets/components/pages/DelSchool";

import NotFound404 from "./assets/components/pages/NotFound404";

function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="votados" element={<Votados />} />
        <Route path="add" element={<AddVoter />} />
        <Route path="addCoordinator" element={<AddCoordinator />} />
        <Route path="addSchool" element={<AddSchool />} />
        <Route path="delete-voter" element={<DeleteVoterPage />} />
        <Route path="delete-school" element={<DelSchool />} />
        <Route path="delete-coordinator" element={<DelCoordinator />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="*" element={<NotFound404/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default Router;
