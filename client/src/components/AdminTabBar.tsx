import { Link } from "react-router-dom";
import { UserProps } from "../context/AuthContext";
import { FiUsers } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { SlUser } from "react-icons/sl";
import { useState } from "react";

const AdminTabBar = ({ user }: { user: UserProps }) => {
  const [activeLink, setActiveLink] = useState<string>('');
  console.log(user);
  return (
    <div className="h-screen min-w-64 bg-background text-textPrimary font-sans border-r border-borderColor">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center w-full bg-background">
          <div className="flex items-center gap-2 px-3 py-4 justify-center">
            <img src={`http://localhost:8000${user.image}`} className="w-16 h-16 rounded-full" alt="Admin" />
            <div className="flex flex-col gap-2">
              <span>Admin Dashboard</span>
              <span className="font-extralight text-sm flex items-center gap-1"><SlUser className="text-white text-base" />: {user.username.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="w-full mb-4 border border-borderColor" />
        <Link
          to={'/admin/dashboard/users'}
          className={`flex items-center w-[90%] gap-4 py-2 pl-4 mx-auto text-lg font-light text-bodyColor rounded-md group ${activeLink === 'users' ? 'bg-tertiaryBg text-emphasisColor' : 'hover:bg-tertiaryBg hover:text-emphasisColor'}`}
          onClick={() => setActiveLink('users')}
        >
          <FiUsers className={`text-xl text-tertiaryColor ${activeLink === 'users' ? 'bg-tertiaryBg text-emphasisColor' : 'group-hover:text-emphasisColor'}`} />
          <span>Users</span>
        </Link>
        <Link
          to={'/admin/dashboard/blogs'}
          className={`flex items-center w-[90%] gap-4 py-2 pl-4 mx-auto text-lg font-light tracking-wide text-bodyColor rounded-md group ${activeLink === 'blogs' ? 'bg-tertiaryBg text-emphasisColor' : 'hover:bg-tertiaryBg'}`}
          onClick={() => setActiveLink('blogs')}
        >
          <IoDocumentsOutline className={`text-xl text-tertiaryColor ${activeLink === 'blogs' ? 'bg-tertiaryBg text-emphasisColor' : 'group-hover:text-emphasisColor'}`} />
          <span>Blogs</span>
        </Link>
        <Link
          to={'/admin/dashboard/categories'}
          className={`flex items-center w-[90%] gap-4 py-2 pl-4 mx-auto text-lg font-light tracking-wide text-bodyColor rounded-md group ${activeLink === 'categories' ? 'bg-tertiaryBg text-emphasisColor' : 'hover:bg-tertiaryBg'}`}
          onClick={() => setActiveLink('categories')}
        >
          <TbCategory className={`text-xl text-tertiaryColor ${activeLink === 'categories' ? 'bg-tertiaryBg text-emphasisColor' : 'group-hover:text-emphasisColor'}`} />
          <span>Categories</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminTabBar;
