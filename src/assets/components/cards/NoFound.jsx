import React from "react";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function NoFound({ prop }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 w-full">
      <h1 className="text-5xl font-bold text-[#A7A7A7] my-5">Ups...</h1>
      <h2 className="text-3xl font-bold text-[#A7A7A7]">{`No se han encontrado ${prop}`}</h2>
      <div className="my-10">
        <FontAwesomeIcon icon={faSearch} className="text-9xl text-[#A7A7A7] animate-pulse" />
      </div>
    </div>
  );
}

export default NoFound;
