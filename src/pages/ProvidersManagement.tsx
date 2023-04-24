import React from "react";

const INPUT_STYLE = "px-3 py-2 rounded outline-none text-normal border";
const CONTROL_STYLE = "flex flex-col gap-1";

const ProvidersManagement = () => {
  return (
      <div className="flex justify-center">
        <div className="bg-white flex flex-col gap-5 max-w-[600px] w-full rounded sm:p-6 px-3 py-9 shadow-lg">
          <h2 className="text-center text-3xl font-normal">
            Gestión de Proovedores
          </h2>
          <form className="bg-white" action="">
            <ul className="flex flex-col gap-7">
              <li className={`${CONTROL_STYLE}`}>
                <label htmlFor="provider-name" className="font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  id="provider-name"
                  placeholder="Ej: MERCOLANTA, KALLEY.SA"
                  className={`${INPUT_STYLE}`}
                />
              </li>
              <li className={`${CONTROL_STYLE}`}>
                <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-white text-normal transition-colors">
                  Añadir proovedor
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
  );
};

export default ProvidersManagement;
