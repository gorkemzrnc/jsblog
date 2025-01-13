import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { logout } from "../lib/api";
import { useNavigate } from 'react-router-dom';
import { UserProps } from "../context/AuthContext";

const Profile = ({user}: {user:UserProps}) => {
  const [profileClick, setProfileClick] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = ()=>{
    setProfileClick((p)=> !p);
  }

  const logoutHandler = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-full flex items-center relative">
      <div className="h-12 w-12 shadow-sm shadow-slate-500 rounded-full bg-white cursor-pointer" onClick={onClickHandler}>
        {
          user.image !== "default" ? <img src={`http://localhost:8000${user.image}`} className="w-full h-full object-fill rounded-full"/> : <FaUser className="w-full h-full text-gray-700 object-fill"/>
        }
      </div>
      <div className={`flex flex-col gap-1 absolute top-full left-1/2 transform tracking-wide -translate-x-1/2 w-28 overflow-hidden bg-[#f8f9f9ec] shadow-lg font-medium mt-1 text-gray-700 rounded-md ${profileClick ? "block" : "hidden"}`}>
        <button className="flex w-full items-center justify-center text-sm text-center hover:shadow-even-shadow  py-1" onClick={logoutHandler}>Logout</button>
        <button className="flex w-full items-center justify-center text-sm text-center hover:shadow-even-shadow py-1">Logout</button>
      </div>
    </div>
  )
}

export default Profile