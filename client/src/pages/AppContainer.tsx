import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const AppContainer = () => {
  const { user, isLoading } = useContext(AuthContext) || { user: null, isLoading: true };

  return isLoading ? (
    <div >
      loading..
    </div>
  ) : user ? (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sohne">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar user={user}/>
        <div className="border-b border-solid border-b-[#f0f2f4]"/>
        <Outlet context={{user}}/>
      </div>
    </div>
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};
export default AppContainer;