import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { SlLogout, SlSettings } from "react-icons/sl";
import { logout } from "../../lib/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../providers/AuthProvider";
import ModalSettings from "./ModalSettings";
import useClickOutside from "../../hooks/useClickOutside";
import { User } from "../../types/User";

const Profile = ({ user }: { user: User }) => {
  const [profileClick, setProfileClick] = useState(false);
  const [openModalSettings, setOpenModalSettings] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  useClickOutside(profileRef, () => setProfileClick(false));

  const onClickHandler = () => {
    setProfileClick((p) => !p);
  }

  const logoutHandler = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      setUser(undefined);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div ref={profileRef} className="h-full flex items-center relative">
      <div className="h-12 w-12 shadow-sm shadow-slate-500 rounded-full bg-white cursor-pointer" onClick={onClickHandler}>
        {
          user.image !== "default" ? <img src={`http://localhost:8000${user.image}`} className="w-full h-full object-fill rounded-full" /> : <FaUser className="w-full h-full text-gray-700 object-fill rounded-full p-1" />
        }
      </div>
      <div className={`flex flex-col gap-1 absolute top-full left-1/2 transform tracking-wide -translate-x-1/2 w-36 overflow-hidden bg-[#f8f9f9ec] shadow-lg border font-medium mt-2 text-gray-700 rounded-md ${profileClick ? "block" : "hidden"}`}>
        <button className="flex w-full items-center text-sm text-center gap-2 py-1 pl-3" onClick={()=>setOpenModalSettings(true)}><SlSettings/>Settings</button>
        <div className="w-full h-[1px] bg-gray-200 shadow-sm"/>
        <button className="flex w-full items-center text-sm text-center gap-2 py-1 pl-3" onClick={logoutHandler}><SlLogout />Logout</button>
      </div>
      <ModalSettings openModalSettings={openModalSettings} setOpenModalSettings={setOpenModalSettings} user={user}/>
    </div>
  )
}

export default Profile