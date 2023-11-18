import { useEffect, useState } from "react";

//axios

import axios from "axios";

//config

import { config } from "../../../config";

//hot toast

import toast, { Toaster } from "react-hot-toast";

function AddCoordinator() {

  //hot toast
  const success = () => toast.success('Coordinador agregado correctamente');
  const error = () => toast.error('Error al agregar coordinador');



  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  //handle submit

  const handleSubmit = (e) => {
    e.preventDefault();
    postCoordinator();

    const form = document.getElementById("coordinatorForm");
    form.reset();
  };

  //handle inputs
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  //post coordinator

  const postCoordinator = async () => {
    try {
      const res = await axios.post(
        `${config.appConfig.host}:${config.appConfig.port}/api/coordinators/addCoordinator`,
        {
          firstName: name,
          lastName: lastName,
          phone: phone,
        }
      );
      
      console.log(res.data);
      success();
      
    } catch (e) {
      console.log(e);
      error();
    }
  };

  //useEffect
  useEffect(() => {}, []);

  return (
    <>
      <section className="w-full h-screen pt-16 flex justify-center">
      <div className="w-full max-w-[1512px] flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold w-full text-center pb-10 text-[#009EFF]">Agregar Coordinador</h1>
       <div>
       <form action="submit" id="coordinatorForm" onSubmit={handleSubmit}>
          <div className="mx-5 flex flex-col">
            <div className="flex flex-col my-5">
              <label className="text-xl font-bold pl-3 ">
                Nombre del coordinator
              </label>
              <input
                type="text"
                required
                className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                placeholder="Inserte el nombre del coordinador"
                onChange={handleName}
              />
            </div>
            {/*  */}
            <div className="flex flex-col my-5">
              <label className="text-xl font-bold pl-3 ">
                Apellido del coordinator
              </label>
              <input
                type="text"
                required
                className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                placeholder="Inserte el apellido del coordinador"
                onChange={handleLastName}
              />
            </div>
            {/*  */}
            <div className="flex flex-col my-5">
              <label className="text-xl font-bold pl-3 ">
                Telefono del coordinator
              </label>
              <input
                type="text"
                required
                className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                placeholder="Inserte el telefono del coordinador"
                onChange={handlePhone}
              />
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

    <Toaster position="top-center" />
    </>
  );
}

export default AddCoordinator;
