import React from "react";

const Manager = () => {
  return (
    <div className="  mycontainer">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-green-800">&lt;</span>
        Pass
        <span className="text-green-800">OP /&gt;</span>
      </h1>
      <p className="text-green-900 text-lg text-center">
        {" "}
        Your Own password Manager
      </p>

      <div className="text-black flex flex-col p-4 gap-8  items-center">
        <input
          className="rounded-full border border-green-500 w-full p-4 py-1"
          type="text"
          name=""
          id=""
        />
        <div className="flex w-full justify-center gap-10 ">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name=""
            id=""
          />
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name=""
            id=""
          />
        </div>
     <button className="flex justify-center items-center bg-green-500 hover:bg-green-300 text-bold rounded-full px-2 py-2 w-fit">
        <animated-icons
          src="https://animatedicons.co/get-icon?name=Plugin&style=minimalistic&token=c35872bb-2ea9-4cf2-857b-d402cb8bb06e"
          trigger="loop"
          height="30"
          width="30"
        ></animated-icons>
    Add Password </button>
      </div>
    </div>
  );
};

export default Manager;
