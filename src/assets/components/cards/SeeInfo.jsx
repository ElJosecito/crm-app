import React from "react";
//useEffect, useState
import { useEffect, useState } from "react";

function SeeInfo({ voter, coordinator }) {
  //funcion para cerrar el drawer
  const closeDrawer = () => {
    const drawer = document.getElementById("dataDrawer");
    drawer.classList.add("hidden");
  };

  return (
    <div
      className="w-full h-screen bg-[#0000006f] fixed flex justify-center items-center top-0 z-20 hidden cursor-pointer"
      id="dataDrawer"
      onClick={closeDrawer}
    >
      {/* box */}
      <div
        className="w-full max-w-[1512px] h-96 bg-white rounded-lg p-10 z-50 fixed cursor-default"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Voter */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Informacion del votante</h1>
        </div>
        <div className="h-[70px] w-fit flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
          <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
            J
          </div>
          {/* Votante */}
          <div className="flex flex-col min-w-80 w-fit border-r-2 border-[#A7A7A7] px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">Votante</span>
            <h2 className="text-xl font-bold min-w-72 overflow-hidden">
              {voter.name}
            </h2>
          </div>
          {/* Cedula */}
          <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">Cedula/Id</span>
            <h2 className="text-xl font-bold w-44 overflow-hidden">
              {voter.identification}
            </h2>
          </div>

          {/* Number */}
          <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">
              Numero del votante
            </span>
            <h2 className="text-xl font-bold w-44 overflow-hidden">
              {voter.phone}
            </h2>
          </div>
          {/* Coordinador */}
          <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">
              Colegio Electoral
            </span>
            <h2 className="text-xl font-bold w-72 overflow-hidden">
              {voter.coleName}
            </h2>
          </div>

          {/* Mesa Electorar */}
          <div className="flex flex-col min-w-40 max-w-40 px-3">
            <span className="text-sm font-bold text-[#A7A7A7] min-w-full">
              Mesa Electoral
            </span>
            <h2 className="text-xl font-bold w-36 overflow-hidden">
              {voter.cole}
            </h2>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Informacion del coordinador</h1>
        </div>

        {/* coordinator */}
        <div className="h-[70px] w-fit pr-10 flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
          <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
            J
          </div>
          {/* Votante */}
          <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">
              Coordinador
            </span>
            <h2 className="text-xl font-bold w-72 overflow-hidden">
              {coordinator.name}
            </h2>
          </div>
          {/* Cedula */}
          <div className="flex flex-col w-48  px-3">
            <span className="text-sm font-bold text-[#A7A7A7]">
              Numero del coordinador
            </span>
            <h2 className="text-xl font-bold w-44 overflow-hidden">
              {coordinator.phone}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeInfo;
