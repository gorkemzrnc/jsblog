import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



const AppContainer = () => {
  const { user, isLoading, error } = useContext(AuthContext) || { user: null, isLoading: true };
  console.log(user);
  if (isLoading) {
    return (
      <div >
        loading..
      </div>
    )
  }

  if (user) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sohne">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar user={user} />
          <div className="border-b border-solid border-b-[#f0f2f4]" />
          <Outlet context={{ user }} />
        </div>
      </div>)
  }

  if (isLoading == false && error) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
};
export default AppContainer;