
function Options() {
  //close drawer
  const closeDrawer = () => {
    const drawer = document.getElementById("optionsDrawer");
    drawer.classList.add("hidden");
  };

  return (
    <>
      <div
        className="w-full h-screen bg-[#0000006f] fixed flex justify-center items-center top-0 z-20 hidden cursor-pointer"
        id="optionsDrawer"
        onClick={closeDrawer}
      >
        {/* box */}
        <div
          className="w-full max-w-[1200px] h-96 bg-white rounded-lg p-10 z-50 fixed flex justify-around cursor-default"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="h-full flex flex-col justify-between">
            <div className="border-b-4 border-[#009EFF] w-fit mb-10">
              <h2 className="font-bold text-xl mb-2">AGREGAR</h2>
            </div>
            <a href="add">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#009EFF]">
                Agregar votante
              </button>
            </a>
            {/*  */}
            <a href="addCoordinator">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#009EFF]">
                Agregar Coordinador
              </button>
            </a>
            {/*  */}
            <a href="addSchool">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#009EFF]">
                Agregar escuela
              </button>
            </a>
            {/*  */}
          </div>

          {/*  */}

          <div className="h-full flex flex-col justify-between">
            <div className="border-b-4 border-[#009EFF] w-fit mb-10">
              <h2 className="font-bold text-xl mb-2">BORRAR</h2>
            </div>
            {/*  */}
            <a href="delete-coordinator">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#ff4b4b]">
                Borrar Coordinador
              </button>
            </a>
            {/*  */}
            <a href="delete-school">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#ff4b4b]">
               Borrar escuela
              </button>
            </a>
            {/*  */}

            <a href="delete-voter">
              <button className="w-[400px] h-[50px] rounded-md font-bold text-white text-lg bg-[#ff4b4b]">
                Borrar votante
              </button>
            </a>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Options;
