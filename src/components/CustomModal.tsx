import React from "react";

interface CustomModalProps {
  children: JSX.Element;
  min_heigth: string;
  show: boolean;
}

const CustomModal = ({ children, min_heigth, show }: CustomModalProps) => {
  return (
    <>
      {show ? (
        <div className="fixed bg-black bg-opacity-[0.3] w-full h-screen top-0 left-0 right-0 z-50 overflow-auto p-2">
          <div
            className={`flex justify-center items-center ${min_heigth} h-full w-full`}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CustomModal;
