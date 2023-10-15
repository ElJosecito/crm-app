import React from "react";
import { useState, useEffect } from "react";

//config
import { config } from "../../../config";

//axios
import axios from "axios";

//components
import Coordinator from "../cards/Coordinator";


function DelCoordinator() {
  const [params, setParams] = useState("");
  const [coordinators, setCoordinators] = useState([]);

  const getCoordinator = async () => {
    try {
      const res = await axios.get(
        `${config.appConfig.host}:${config.appConfig.port}/api/coordinators/getAll`
      );
      if (!params) {
        setCoordinators(res.data.data);
        console.log(res.data.data);
      } else {
        const filter = res.data.data.filter((coordinator) => {
          return (
            coordinator.firstName.toLowerCase().includes(params.toLowerCase()) ||
            coordinator.lastName.toLowerCase().includes(params.toLowerCase()) ||
            coordinator.phone.includes(params)
          );
        });
        setCoordinators(filter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleParams = (e) => {
    setParams(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getCoordinator();
  }, [params]);

  return (
    <>
      <section className="w-full h-screen pt-16 flex justify-center">
        <div className="w-full max-w-[1512px]">
          <div className="w-full flex justify-between">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-[430px] h-[50px] bg-[#E7E7E7] rounded-md focus:outline-none px-4 text-lg font-bold"
                placeholder="Buscar un votante"
                onChange={handleParams}
              />
              <button className="w-[110px] h-[50px] rounded-md ml-5 font-bold text-white text-lg bg-[#009EFF]">
                search
              </button>
            </form>

            <a href="/">
              <button className="w-[240px] h-[50px] rounded-md ml-5 font-bold text-white text-lg bg-[#009EFF]">
                Home
              </button>
            </a>
          </div>

          <div className="w-full min-h-screen h-fit mt-10 ">
          {coordinators.length > 0 ? (
              coordinators.map((coordinators, index) =>
                  <Coordinator key={index} id={coordinators._id} firstName={coordinators.firstName} lastName={coordinators.lastName} phone={coordinators.phone} getCoordinator={getCoordinator}/>
              )
            ) : (
              <div className="w-full h-[50px] flex justify-center items-center bg-[#009EFF] rounded-md">
                <h2 className="text-white text-lg font-bold">
                  No hay votantes
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DelCoordinator;
