import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineExpandMore, MdExpandLess } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  toggleShowNavigation: () => void;
  showNavigation: boolean;
}

const Header = ({ toggleShowNavigation, showNavigation }: HeaderProps) => {
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const { logout, user } = useAuth();

  const toggleShowMenu = () => {
    setShowAccountSettings(!showAccountSettings);
  };
  return (
    <header className="bg-gray-50 border-b w-full h-14 flex justify-center sticky top-0">
      <div className="max-w-[1400px] flex w-full items-center">
        <ul className="flex w-full justify-between px-5 items-center">
          <li className="flex flex-row gap-5">
            <button onClick={toggleShowNavigation}>
              {showNavigation ? (
                <AiOutlineClose size={26} />
              ) : (
                <AiOutlineMenu size={26} />
              )}
            </button>
            <h1 className="font-normal text-2xl italic">TTory</h1>
          </li>
          <li className="hidden sm:flex items-center bg-gray-50 h-[37px]">
            <input
              type="text"
              placeholder="Search"
              className="w-[350px] rounded-l outline-none px-3 bg-transparent border-2 h-full border-r-0"
            />
            <button className="bg-[#1D1B31] hover:bg-[#332f59] transition-colors text-white rounded-r h-full w-[37px] flex items-center justify-center border-2 border-l-0">
              <AiOutlineSearch size={20} />
            </button>
          </li>
          <li>
            <button
              onClick={toggleShowMenu}
              className="bg-[#1D1B31] py-[5px] w-[150px] text-gray-200 rounded-md flex flex-row items-center justify-between middle none center px-5 "
            >
              Tu cuenta{" "}
              {showAccountSettings ? (
                <MdExpandLess size={25} />
              ) : (
                <MdOutlineExpandMore size={25} />
              )}
            </button>
            <ul
              className={`bg-[#1D1B31] border text-gray-300 absolute mt-3 py-2 rounded-md z-10 min-w-[150px] gap-2 ${
                showAccountSettings ? "flex flex-col" : "hidden"
              } overflow-auto`}
            >
              <li className="px-3 py-1 w-full">{user?.name}</li>
              <li className="px-3 py-1 w-full">
                <button
                  onClick={logout}
                  className="bg-[#393565] w-full rounded p-1"
                >
                  Cerrar sesion
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
