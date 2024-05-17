import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Logo w={90} h={50} />
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            search
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center"></div>

          <span>cart</span>

          <div>
            <button className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
