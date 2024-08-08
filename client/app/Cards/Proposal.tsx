import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
const Proposal = () => {
  return (
    <div className="flex h-xl bg-transparent px-3 py-1 rounded-xl border text-white border-gray-600 bg-clip-border shadow-md shadow-blue-gray-900/5 flex-col items-start justify-between">
      <div className="group w-full relative ">
        <h3 className="mt-3 text-lg  font-semibold leading-6  ">
          <div>
            <span className="absolute" />
            Name
          </div>
        </h3>
        <div className="flex w-full items-start justify-start mt-3 h-20 line-clamp-3 text-sm leading-6">
          <div>Description</div>
        </div>
      </div>
      <div className=" my-2 flex items-center justify-between w-full">
        <div className=" flex  items-center">
          <FaRegUser size={25} />
          <div className="text-sm mx-1 leading-5">
            <div className="font-semibold ">
              <div>
                <span className="absolute " />
                Creator
              </div>
            </div>
            <div className=" truncate max-w-[100px]">{"0x0000000000000"}</div>
          </div>
        </div>
        <div className="flex items-center text-xs">
          <button className="px-4 relative py-1 z-10 text-sm font-medium text-blue-600 hover:underline  rounded-2xl  hover:border-gray-300">
            Open
            <div className="absolute right-0 top-1.5">
              <IoOpenOutline />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
