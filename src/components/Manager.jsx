import React from "react";
import { useRef, useState, useEffect } from "react";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
        passwordRef.current.type = "password"
    } else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {
    setPasswordArray((currentPasswords) => {
      const updatedPasswords = [...currentPasswords, form];
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      return updatedPasswords;
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] `bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-8 m-auto `h-[310px] ` w-[318px]`rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="  mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8  items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-center gap-10 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id=""
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-300 rounded-full gap-2 px-8 py-2 w-fit border border-green-900 "
          >
            <animated-icons
              src="https://animatedicons.co/get-icon?name=Plugin&style=minimalistic&token=c35872bb-2ea9-4cf2-857b-d402cb8bb06e"
              trigger="hover"
              height="30"
              width="30"
            ></animated-icons>
            Add Password{" "}
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0  && <div> No password to show</div>}
          {passwordArray.length != 0  && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Usernmae</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item ,index)=>{
                return  <tr keye ={index}>
                <td className="py-2 border border-white text-center w-32"><a href={item.site} target="_blank">{item.site} </a>
                <animated-icons
  src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
  trigger="hover"
  height="30"
  width="30"
 
></animated-icons></td>
                <td className="py-2 border border-white text-center w-32">{item.username}</td>
                <td className="py-2 border border-white text-center w-32">{item.password}</td>
              </tr>
              })}
            
           
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
