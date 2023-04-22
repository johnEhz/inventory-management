import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineInventory } from 'react-icons/md'
import links from "../data/navigationLinks";

interface NavigationProps {
  showNavigation: boolean
}

const LINK_STYLE =
  "w-full h-full p-3 px-6 hover:bg-[#1D1B31] hover:text-slate-300 transition-colors";

const Navigation = ({ showNavigation }: NavigationProps) => {
  return (
    <div className={`bg-[#11111D] text-[#FFFFFF] fixed transition-transform h-screen py-6 ${showNavigation ? 'w-[250px]': 'w-0 hidden'}`}>
      <nav className="flex flex-col gap-6 min-h-[400px] h-full overflow-y-auto">
        <h2 className="text-center font-normal text-2xl">Navegación</h2>
        <ul className="flex flex-col gap-4 text-md font-normal text-[#a3a3a3]">
          <li className="flex">
            <button className={`${LINK_STYLE} text-left`}>Inventarios</button>
          </li>
          {links.map((link, idx) => (
            <li key={idx} className="flex">
              <NavLink className={LINK_STYLE} to={link.route}>
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
