import { useContext, useState } from "react"
import AdminTabBar from "../components/AdminTabBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const { user, isLoading } = useContext(AuthContext) || { user: null, isLoading: true };

  return isLoading ? (
    <div >
      loading..
    </div>
  ) : user?.role == "admin" ? (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="layout-container flex h-full">
        <AdminTabBar user={user} />
        <Outlet context={{user}}/>
      </div>
    </div>
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
}

export default AdminPanel