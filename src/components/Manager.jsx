import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
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

  const animatediconcopy = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => { 

    if(form.site.length>3 && form.site.length>3  && form.site.length>3){
      setPasswordArray((currentPasswords) => {
        const updatedPasswords = [...currentPasswords,{...form ,id:uuidv4()}];
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        return updatedPasswords;
      });
      setform({site: "", username: "", password: ""})
      toast("Password saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
      else{ 
          toast(' Error: Password not saved')

    }
  }

  const deletePassword = (id) => { 
    console.log("Deleting password with id",id)
    let c =  confirm("Do you really want to delete this password")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
      
    }
  }; 

  const editPassword = (id) => { 
    
    console.log("Editing password with id",id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] `bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-8 m-auto `h-[310px] ` w-[318px]`rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[82.5vh]">
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
          <div className="flex flex-col md:flex-row w-full justify-center gap-10 ">
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
              <input
                ref={passwordRef}
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
            Save Password{" "}
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div> No password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidde mb-10 ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}{" "}
                          </a>

                          <div
                            className=" animatediconcopy size-7 cursor-pointer"
                            onClick={() => animatediconcopy(item.site)}
                          >
                            <animated-icons
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                              trigger="hover"
                              height="30"
                              width="30"
                            ></animated-icons>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex items-center justify-center">
                         <span>{item.username}</span> 
                          <div
                            className=" animatediconcopy size-7 cursor-pointer"
                            onClick={() => animatediconcopy(item.username)}
                          >
                            <animated-icons
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                              trigger="hover"
                              height="30"
                              width="30"
                            ></animated-icons>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex items-center justify-center">
                        <span>  {item.password}</span>
                          <div
                            className="  animatediconcopy size-7 cursor-pointer"
                            onClick={() => animatediconcopy(item.password)}
                          >
                            <animated-icons
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee "
                              trigger="hover"
                              height="30"
                              width="30"
                            ></animated-icons>
                          </div>
                        </div>
                      </td>

                      <td className=" flex  py-2 border border-white text-center gap-1">
                    <span className="cursor-pointer" onClick={()=>{editPassword(item.id)}}><animated-icons
  src="https://animatedicons.co/get-icon?name=edit&style=minimalistic&token=bef79568-d828-4e67-a904-60a1bb446375"
  trigger="hover"
  height="30"
  width="30"
></animated-icons></span>

                           <span className="cursor-pointer"  onClick={()=>{deletePassword(item.id)}}><animated-icons
src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
   trigger="hover"
  height="30"
  width="30"
></animated-icons></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
