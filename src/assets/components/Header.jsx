import React from "react";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//components
import Options from "./cards/Options";

function Header() {
  //open drawer
  const openDrawer = () => {
    const drawer = document.getElementById("optionsDrawer");
    drawer.classList.remove("hidden");
  };

  return (
    <>
      <header className="flex justify-between items-center bg-[#009EFF] z-10 w-full fixed h-20 px-10">
        <a href="/">
          <h1 className="font-bold text-2xl text-white">CRM</h1>
        </a>

        <div className="flex items-center">
          <div className="flex items-center border-4 border-white p-3 rounded-full cursor-pointer" onClick={openDrawer}>
            <FontAwesomeIcon icon={faPlus} className="text-lg text-white" />
          </div>
        </div>
      </header>
      <div>
        <div className="h-10"></div>
      </div>

      <Options />
    </>
  );
}

export default Header;
