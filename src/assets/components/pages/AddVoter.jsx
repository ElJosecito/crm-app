import React, { useEffect, useState } from "react";

import axios from "axios";

//config
import { config } from "../../../config";
import { data } from "autoprefixer";

//hot toast
import toast, { Toaster } from "react-hot-toast";

function AddVoter() {
  //variables
  const [coordinator, setCoordinator] = useState([]);
  const [colegio, setColegio] = useState([]);

  //form variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [identification, setIdentification] = useState("");
  const [colegioId, setColegioId] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");


  //hot toast
  const success = () => toast.success("Votante agregado correctamente");
  const error = () => toast.error("Error al agregar votante");


  //funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVoter(data);
      success();
      // Aquí puedes realizar acciones adicionales después de agregar el votante, si es necesario.
    } catch (error) {
      console.log(error);
      error();
    }

    const form = document.getElementById("voterForm");
    form.reset();
  };

  const addVoter = async () => {
    try {
      const res = await axios.post(
        `${config.appConfig.host}:${config.appConfig.port}/api/voters/addVoter`,
        {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          identification: identification,
          colegio: colegioId,
          coordinator: coordinatorId,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
      throw error; // Propagar el error para que pueda ser manejado en el bloque catch de handleSubmit
    }
  };

  const getCoordinator = async () => {
    try {
      const res = await axios.get(
        `${config.appConfig.host}:${config.appConfig.port}/api/coordinators/getAll`
      );
      setCoordinator(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getColegio = async () => {
    try {
      const res = await axios.get(
        `${config.appConfig.host}:${config.appConfig.port}/api/schools/getAll`
      );
      setColegio(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //funciones para el form
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    // console.log(e.target.value);
  };
  const handleLastName = (e) => {
    // console.log(e.target.value);
    setLastName(e.target.value);
  };
  const handlePhone = (e) => {
    // console.log(e.target.value);
    setPhone(e.target.value);
  };
  const handleIdentification = (e) => {
    // console.log(e.target.value);
    setIdentification(e.target.value);
  };
  const handleColegio = (e) => {
    // console.log(e.target.value);
    setColegioId(e.target.value);
  };
  const handleCoordinator = (e) => {
    // console.log(e.target.value);
    setCoordinatorId(e.target.value);
  };

  //useEffect
  useEffect(() => {
    getCoordinator();
    getColegio();
  }, []);

  return (
    <>
    <section className="w-full h-screen pt-16 flex justify-center">
      <div className="w-full max-w-[1512px] flex justify-center items-center">
        <div>
          <form
            id="voterForm"
            action="submit"
            onSubmit={handleSubmit}
            className="flex"
          >
            <div className="mx-5 flex flex-col">
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Nombre del votante
                </label>
                <input
                  type="text"
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Inserte el nombre del votante"
                  onChange={handleFirstName}
                />
              </div>
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Apellido del votante
                </label>
                <input
                  type="text"
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Apellido del votante"
                  onChange={handleLastName}
                />
              </div>
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">Colegio</label>
                <select
                  name=""
                  id=""
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold appa"
                  onChange={handleColegio}
                >
                  <option value="">Colegio</option>
                  {colegio.map((colegio, index) => (
                    <option key={index} value={colegio._id}>
                      {`${colegio.name}, Mesa: ${colegio.mesa}`}
                    </option>
                  ))}
                </select>
              </div>
              {/*  */}
            </div>
            <div className="mx-5 flex flex-col">
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Numero de telefono
                </label>
                <input
                  type="text"
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Inserte el telefono del votante"
                  onChange={handlePhone}
                />
              </div>
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Cedula de identidad
                </label>
                <input
                  type="text"
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Inserte identificacion del votante"
                  onChange={handleIdentification}
                />
              </div>
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3">Coordinador</label>
                <select
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold appa"
                  onChange={handleCoordinator}
                >
                  <option value="">Coordinador</option>
                  {coordinator.map((coordinator, index) => (
                    <option key={index} value={coordinator._id}>
                      {`${coordinator.firstName} ${coordinator.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
              {/*  */}
              <button className="w-[110px] h-[50px] rounded-md font-bold text-white text-lg bg-[#009EFF] self-end">
                enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <Toaster position="bottom-center" />
    </>
  );
}

export default AddVoter;
