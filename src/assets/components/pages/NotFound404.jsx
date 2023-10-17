import React from "react";

function NotFound404() {
  return (
    <section className="w-full h-screen flex justify-center">
      <div className="w-full max-w-[1512px]">
        <div className="w-full flex flex-col items-center justify-center h-screen"> 
        <h1  className="text-9xl font-bold text-[#A7A7A7] animate-pulse">404</h1>
        <h2 className="text-3xl font-medium mx-5 text-[#A7A7A7]">Page not found</h2>

        <p className="text-base font-light mt-20 text-[#A7A7A7]">Sorry, the page you're looking for doesn't exist.</p>

        <a href="/">
        <button className="w-[200px] h-[40px] rounded-md mt-5 font-bold text-white text-lg bg-[#009EFF]">Go Home Page</button>
        </a>
        </div>
      </div>
    </section>
  );
}

export default NotFound404;
