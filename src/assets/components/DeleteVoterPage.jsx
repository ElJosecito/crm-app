import React from "react";

//useEffect, useState
import { useEffect, useState } from "react";
//components
import { DeleteVoter } from "./cards/Voter";
import SeeInfo from "./cards/SeeInfo";
import NoFound from "./cards/NoFound";
//config
import { config } from "../../config";
//axios
import axios from "axios";

function DeleteVoterPage() {
  //variables
  const [voters, setVoters] = useState([]);
  const [voter, setVoter] = useState([]);
  const [coordinator, setCoordinator] = useState([]);

  const [params, setParams] = useState("");

  //funciones
  const getVoters = async () => {
    try {
      const res = await axios.get(
        `${config.appConfig.host}:${config.appConfig.port}/api/voters/getAllWithCoordinator`
      );
      if (!params) {
        setVoters(res.data.data);
        // console.log(res.data.data);
      } else {
        const filter = res.data.data.filter((voter) => {
          return (
            voter.firstName.toLowerCase().includes(params.toLowerCase()) ||
            voter.lastName.toLowerCase().includes(params.toLowerCase()) ||
            voter.colegio.mesa.toLowerCase().includes(params.toLowerCase()) ||
            voter.phone.includes(params) ||
            voter.identification.includes(params)
          );
        });
        setVoters(filter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //funciones
  const getLocalStorage = () => {
    // Obtener cadenas JSON de localStorage
    const voterDataString = localStorage.getItem("voter");
    const coordinatorDataString = localStorage.getItem("coordinator");
    // Convertir cadenas JSON a objetos
    setVoter(JSON.parse(voterDataString));
    setCoordinator(JSON.parse(coordinatorDataString));
  };
  //handle params
  const handleParams = (e) => {
    setParams(e.target.value);
  };

  //handle Form
  const handleForm = async (e) => {
    e.preventDefault();
  };

  //useEffect
  useEffect(() => {
    getVoters();
  }, [params]);
  return (
    <>
      <section className="w-full min-h-screen h-fit pt-16 flex justify-center">
        <div className="w-full max-w-[1512px]">
          <div className="w-full flex justify-between">
            <form onSubmit={handleForm}>
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
                Inicio
              </button>
            </a>
          </div>

          <div className="w-full min-h-screen h-fit mt-10 ">
            {voters.length > 0 ? (
              voters.map((voter, index) => (
                <DeleteVoter
                  key={index}
                  id={voter._id}
                  firstName={voter.firstName}
                  lastName={voter.lastName}
                  phone={voter.phone}
                  identification={voter.identification}
                  coordFirstName={voter.coordinator && voter.coordinator.firstName}
                  coordLastName={voter.coordinator && voter.coordinator.lastName}
                  coordPhone={voter.coordinator && voter.coordinator.phone}
                  cole={voter.colegio && voter.colegio.mesa}
                  coleName={voter.colegio && voter.colegio.name}
                  getLocalStorage={getLocalStorage}
                  getVoters={getVoters}
                />
              ))
            ) : (
              <NoFound prop="votantes" />
            )}
          </div>
        </div>
      </section>

      <SeeInfo voter={voter} coordinator={coordinator} />
    </>
  );
}

export default DeleteVoterPage;
