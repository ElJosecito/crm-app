import React from "react";
import { useState } from "react";

//hot toast
import toast, { Toaster } from "react-hot-toast";

//axios
import axios from "axios";

//config
import { config } from "../../../config";

function AddSchool() {
  //hot toast
  const success = () =>
    toast.success("Colegio electoral agregado correctamente");
  const error = () => toast.error("Error al agregar colegio electoral");

  const [schoolName, setSchoolName] = useState("");
  const [schoolMesa, setSchoolMesa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AddSchool();

    const form = document.getElementById("schoolForm");
    form.reset();
  };

  const handleName = (e) => {
    setSchoolName(e.target.value);
  };

  const handleMesa = (e) => {
    setSchoolMesa(e.target.value);
  };

  const AddSchool = async () => {
    try {
      const res = await axios.post(
        `${config.appConfig.host}:${config.appConfig.port}/api/schools/addSchool`,
        {
          name: schoolName,
          mesa: schoolMesa,
        }
      );

      // console.log(res.data);
      success();

    } catch (err) {
      console.log(err);
      error();
    }
  };

  return (
    <>
      <section className="w-full h-screen pt-16 flex justify-center">
        <div className="w-full max-w-[1512px] flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold w-full text-center pb-20 text-[#009EFF]">Agregar Colegio Electoral</h1>
         <div>
         <form action="submit" id="schoolForm" onSubmit={handleSubmit}>
            <div className="mx-5 flex flex-col">
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Nombre del colegio electoral
                </label>
                <input
                  type="text"
                  required
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Nombre del colegio electoral"
                  onChange={handleName}
                />
              </div>
              {/*  */}
              <div className="flex flex-col my-5">
                <label className="text-xl font-bold pl-3 ">
                  Mesa del colegio electoral
                </label>
                <input
                  type="text"
                  required
                  className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                  placeholder="Mesa del colegio electoral"
                  onChange={handleMesa}
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

export default AddSchool;
