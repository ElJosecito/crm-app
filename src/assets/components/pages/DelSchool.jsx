import React, { useState, useEffect } from "react";

//config
import { config } from "../../../config";

//axios
import axios from "axios";

//components
import School from "../cards/School";

import NoFound from "../cards/NoFound";

function DelSchool() {
  const [params, setParams] = useState("");

  const [schools, setSchools] = useState([]);

  const getSchool = async () => {
    try {
      const res = await axios.get(
        `${config.appConfig.host}:${config.appConfig.port}/api/schools/getAll`
      );

      if (!params) {
        setSchools(res.data.data);
        console.log(res.data.data);
      } else {
        const filter = res.data.data.filter((school) => {
          return (
            school.name.toLowerCase().includes(params.toLowerCase()) ||
            school.phone.includes(params)
          );
        });
        setSchools(filter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleParams = (e) => {
    setParams(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getSchool();
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
            {schools.length > 0 ? (
              schools.map((school, index) => (
                <School
                  key={index}
                  id={school._id}
                  name={school && school.name}
                  mesa={school && school.mesa}
                  getSchool={getSchool}
                />
              ))
            ) : (
              <NoFound prop="colegios electorales" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DelSchool;
