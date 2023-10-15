import React from "react";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//axios
import axios from "axios";

//config
import { config } from "../../../config";

function Coordinator({ firstName, lastName, phone, id, getCoordinator }) {

    const deleteCoordinator = async () => {
        try {
            const res = await axios.delete(
                `${config.appConfig.host}:${config.appConfig.port}/api/coordinators/deleteCoordinator/${id}`
            );
            console.log(res);
            getCoordinator();
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
      {/* coordinator */}
      <div className="h-[70px] w-fit flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
        <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
            {firstName[0]}
        </div>
        {/* Votante */}
        <div className="flex flex-col min-w-96 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Coordinador</span>
          <h2 className="text-xl font-bold w-96">{`${firstName} ${lastName}`.toUpperCase()}</h2>
        </div>
        {/* Cedula */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">
            Numero del coordinador
          </span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">{phone}</h2>
        </div>

        {/* Botones */}
        <div className="flex ">
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#ff3737] mx-7 flex justify-center items-center"
            onClick={deleteCoordinator}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Coordinator;
