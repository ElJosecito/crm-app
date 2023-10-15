import React from "react";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
//config
import { config } from "../../../config";
//axios
import axios from "axios";
//hot toast
import toast, { Toaster } from "react-hot-toast";

export function Voter({
  id,
  firstName,
  lastName,
  phone,
  identification,
  coordFirstName,
  coordLastName,
  coordPhone,
  cole,
  coleName,
  getLocalStorage,
  getVoters,
}) {
  //hot toast
  const success = () => toast.success("Votante agregado correctamente");
  const error = () => toast.error("Error al agregar votante");

  //formatear nombre
  const NameFormater = (firstName, lastName) => {
    try {
      if (firstName && lastName) {
        const firstNameFormater = firstName.split(" ");
        const lastNameFormater = lastName.split(" ");
        const name = firstNameFormater[0];
        const surname = lastNameFormater[0];
        const nameFormated = `${name} ${surname}`;
        const nameUpper = nameFormated.toUpperCase();
        return nameUpper;
      } else {
        return "Sin Coordinador";
      }
    } catch (error) {
      console.log(error);
    }
  };

  //formatear cedula
  const formatearCedula = (cedula) => {
    try {
      // Eliminar cualquier caracter que no sea un número
      const cedulaLimpia = cedula.replace(/\D/g, "");
      // Verificar si el número tiene al menos 10 dígitos
      if (cedulaLimpia.length >= 10) {
        // Formatear el número en el formato deseado
        return `${cedulaLimpia.slice(0, 3)}-${cedulaLimpia.slice(
          3,
          10
        )}-${cedulaLimpia.slice(10)}`;
      } else {
        // Si el número no tiene al menos 10 dígitos, devolver el número sin formato
        console.log(cedulaLimpia);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const phoneHandler = (phone) => {
    if (phone == null) {
      return "Sin numero";
    } else {
      return phone;
    }
  }

  //mostrar drawer
  const ShowDrawer = (e) => {
    // e.stopPropagation();
    const drawer = document.getElementById("dataDrawer");
    drawer.classList.remove("hidden");
  };

  const setLocalStorage = () => {
    const voterData = {
      id: id,
      name: `${firstName} ${lastName}`.toUpperCase(),
      phone: phone,
      identification: formatearCedula(identification),
      cole: cole,
      coleName: coleName,
    };

    const coordinatorData = {
      name: NameFormater(coordFirstName, coordLastName),
      phone: coordPhone,
    };

    // Convertir objetos a cadenas JSON
    const voterDataString = JSON.stringify(voterData);
    const coordinatorDataString = JSON.stringify(coordinatorData);

    // Almacenar cadenas JSON en localStorage
    localStorage.setItem("voter", voterDataString);
    localStorage.setItem("coordinator", coordinatorDataString);

    getLocalStorage();

    // Mostrar el drawer
    ShowDrawer();
  };

  //make voter true
  const makeVoterTrue = async () => {
    const res = await axios.put(
      `${config.appConfig.host}:${config.appConfig.port}/api/voters/makeVoterTrue/${id}`
    );
    getVoters();
    if (res.status == 200) {
      success();
    } else {
      error();
    }
  };

  return (
    <>
      <div className="h-[70px] flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
        <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
          {firstName[0]}
        </div>
        {/* Votante */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Votante</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(firstName, lastName)}{" "}
          </h2>
        </div>
        {/* Coordinador */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Coordinador</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(coordFirstName, coordLastName)}
          </h2>
        </div>

        {/* Cedula */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Cedula/Id</span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {formatearCedula(identification)}
          </h2>
        </div>

        {/* Number */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">
            Numero del coordinador
          </span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {coordPhone ? coordPhone : "Sin numero"}
          </h2>
        </div>

        {/* Mesa Electorar */}
        <div className="flex flex-col min-w-40 max-w-40 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7] min-w-full">
            Colegio electoral
          </span>
          <h2 className="text-xl font-bold w-36 overflow-hidden">{cole ? cole : "Sin Colegio"}</h2>
        </div>

        {/* Botones */}
        <div className="flex w-60 justify-center ">
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#01A578] mx-3 flex justify-center items-center"
            onClick={makeVoterTrue}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </div>
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#009EFF] mx-3 flex justify-center items-center"
            onClick={setLocalStorage}
          >
            <FontAwesomeIcon icon={faEye} className="text-xl" />
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}

//Unvote Voter
export function UnVoteVoter({
  id,
  firstName,
  lastName,
  phone,
  identification,
  coordFirstName,
  coordLastName,
  coordPhone,
  cole,
  coleName,
  getLocalStorage,
  getVoters,
}) {
  //hot toast
  const success = () =>
    toast.success("El votante se ha desmarcado correctamente");
  const error = () => toast.error("Error al desmarcar el votante");
  //formatear nombre
  const NameFormater = (firstName, lastName) => {
    try {
      if (firstName && lastName) {
        const firstNameFormater = firstName.split(" ");
        const lastNameFormater = lastName.split(" ");
        const name = firstNameFormater[0];
        const surname = lastNameFormater[0];
        const nameFormated = `${name} ${surname}`;
        const nameUpper = nameFormated.toUpperCase();
        return nameUpper;
      } else {
        return "Sin coordinador";
      }
    } catch (error) {
      console.log(error);
    }
  };

  //formatear cedula
  const formatearCedula = (cedula) => {
    try {
      // Eliminar cualquier caracter que no sea un número
      const cedulaLimpia = cedula.replace(/\D/g, "");
      // Verificar si el número tiene al menos 10 dígitos
      if (cedulaLimpia.length >= 10) {
        // Formatear el número en el formato deseado
        return `${cedulaLimpia.slice(0, 3)}-${cedulaLimpia.slice(
          3,
          10
        )}-${cedulaLimpia.slice(10)}`;
      } else {
        // Si el número no tiene al menos 10 dígitos, devolver el número sin formato
        console.log(cedulaLimpia);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //mostrar drawer

  const ShowDrawer = (e) => {
    // e.stopPropagation();
    const drawer = document.getElementById("dataDrawer");
    drawer.classList.remove("hidden");
  };

  const setLocalStorage = () => {
    const voterData = {
      id: id,
      name: `${firstName} ${lastName}`.toUpperCase(),
      phone: phone,
      identification: formatearCedula(identification),
      cole: cole,
      coleName: coleName,
    };

    const coordinatorData = {
      name: NameFormater(coordFirstName, coordLastName),
      phone: coordPhone,
    };

    // Convertir objetos a cadenas JSON
    const voterDataString = JSON.stringify(voterData);
    const coordinatorDataString = JSON.stringify(coordinatorData);

    // Almacenar cadenas JSON en localStorage
    localStorage.setItem("voter", voterDataString);
    localStorage.setItem("coordinator", coordinatorDataString);

    getLocalStorage();

    // Mostrar el drawer
    ShowDrawer();
  };

  //make voter false
  const makeVoterFalse = async () => {
    const res = await axios.put(
      `${config.appConfig.host}:${config.appConfig.port}/api/voters/makeVoterFalse/${id}`
    );
    getVoters();

    if (res.status == 200) {
      success();
    } else {
      error();
    }
  };

  return (
    <>
      <div className="h-[70px] flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
        <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
          {firstName[0]}
        </div>
        {/* Votante */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Votante</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(firstName, lastName)}
          </h2>
        </div>
        {/* Coordinador */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Coordinador</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(coordFirstName, coordLastName)}
          </h2>
        </div>

        {/* Cedula */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Cedula/Id</span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {formatearCedula(identification)}
          </h2>
        </div>

        {/* Number */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">
            Numero del coordinador
          </span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {coordPhone ? coordPhone : "Sin numero"}
          </h2>
        </div>

        {/* Mesa Electorar */}
        <div className="flex flex-col min-w-40 max-w-40 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7] min-w-full">
            Colegio electoral
          </span>
          <h2 className="text-xl font-bold w-36 overflow-hidden">{cole ? cole : "Sin Colegio"}</h2>
        </div>

        {/* Botones */}
        <div className="flex w-60 justify-center ">
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#FF7F37] mx-3 flex justify-center items-center"
            onClick={makeVoterFalse}
          >
            <FontAwesomeIcon icon={faMinus} className="text-xl" />
          </div>
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#009EFF] mx-3 flex justify-center items-center"
            onClick={setLocalStorage}
          >
            <FontAwesomeIcon icon={faEye} className="text-xl" />
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}

//delete Voter
export function DeleteVoter({
  id,
  firstName,
  lastName,
  phone,
  identification,
  coordFirstName,
  coordLastName,
  coordPhone,
  cole,
  coleName,
  getLocalStorage,
  getVoters,
}) {

  //hot toast
  const success = () => toast.success("Votante eliminado correctamente");
  const error = () => toast.error("Error al eliminar el votante");
  //formatear nombre
  const NameFormater = (firstName, lastName) => {
    try {
      if (firstName && lastName) {
        const firstNameFormater = firstName.split(" ");
        const lastNameFormater = lastName.split(" ");
        const name = firstNameFormater[0];
        const surname = lastNameFormater[0];
        const nameFormated = `${name} ${surname}`;
        const nameUpper = nameFormated.toUpperCase();
        return nameUpper;
      } else {
        return "Sin coordinador";
      }
    } catch (error) {
      console.log(error);
    }
  };

  //formatear cedula
  const formatearCedula = (cedula) => {
    try {
      // Eliminar cualquier caracter que no sea un número
      const cedulaLimpia = cedula.replace(/\D/g, "");
      // Verificar si el número tiene al menos 10 dígitos
      if (cedulaLimpia.length >= 10) {
        // Formatear el número en el formato deseado
        return `${cedulaLimpia.slice(0, 3)}-${cedulaLimpia.slice(
          3,
          10
        )}-${cedulaLimpia.slice(10)}`;
      } else {
        // Si el número no tiene al menos 10 dígitos, devolver el número sin formato
        console.log(cedulaLimpia);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //mostrar drawer

  const ShowDrawer = (e) => {
    // e.stopPropagation();
    const drawer = document.getElementById("dataDrawer");
    drawer.classList.remove("hidden");
  };

  const setLocalStorage = () => {
    const voterData = {
      id: id,
      name: `${firstName} ${lastName}`.toUpperCase(),
      phone: phone,
      identification: formatearCedula(identification),
      cole: cole,
      coleName: coleName,
    };

    const coordinatorData = {
      name: NameFormater(coordFirstName, coordLastName),
      phone: coordPhone,
    };

    // Convertir objetos a cadenas JSON
    const voterDataString = JSON.stringify(voterData);
    const coordinatorDataString = JSON.stringify(coordinatorData);

    // Almacenar cadenas JSON en localStorage
    localStorage.setItem("voter", voterDataString);
    localStorage.setItem("coordinator", coordinatorDataString);

    getLocalStorage();

    // Mostrar el drawer
    ShowDrawer();
  };

  //delete voter

  const deleteVoter = async () => {
    const res = await axios.delete(
      `${config.appConfig.host}:${config.appConfig.port}/api/voters/deleteVoter/${id}`
    );
    getVoters();

    if (res.status == 200) {
      success();
    } else {
      error();
    }
  };
  return (
    <>
      <div className="h-[70px] flex items-center rounded-lg shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] my-5 bg-white">
        <div className="flex justify-center items-center h-[50px] w-[50px] text-2xl text-white font-bold rounded-full bg-[#009EFF] mx-3">
          {firstName[0]}
        </div>
        {/* Votante */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Votante</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(firstName, lastName)}{" "}
          </h2>
        </div>
        {/* Coordinador */}
        <div className="flex flex-col w-80 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Coordinador</span>
          <h2 className="text-xl font-bold w-72 overflow-hidden">
            {NameFormater(coordFirstName, coordLastName)}
          </h2>
        </div>

        {/* Cedula */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">Cedula/Id</span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {formatearCedula(identification)}
          </h2>
        </div>

        {/* Number */}
        <div className="flex flex-col w-48 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7]">
            Numero del coordinador
          </span>
          <h2 className="text-xl font-bold w-44 overflow-hidden">
            {coordPhone ? coordPhone : "Sin numero"}
          </h2>
        </div>

        {/* Mesa Electorar */}
        <div className="flex flex-col min-w-40 max-w-40 border-r-2 border-[#A7A7A7] px-3">
          <span className="text-sm font-bold text-[#A7A7A7] min-w-full">
            Colegio electoral
          </span>
          <h2 className="text-xl font-bold w-36 overflow-hidden">{cole ? cole : "Sin Colegio"}</h2>
        </div>

        {/* Botones */}
        <div className="flex w-60 justify-center ">
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#ff3737] mx-3 flex justify-center items-center"
            onClick={deleteVoter}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
          </div>
          <div
            className=" h-[50px] w-[50px] rounded-full font-bold text-white text-sm bg-[#009EFF] mx-3 flex justify-center items-center"
            onClick={setLocalStorage}
          >
            <FontAwesomeIcon icon={faEye} className="text-xl" />
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}
