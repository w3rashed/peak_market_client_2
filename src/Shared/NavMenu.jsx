import { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const NavMenu = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
    console.log("log out succed");
    toast.success("Successfully loged out!", {
      position: "top-center",
    });
    Navigate(location?.state ? location.state : "/");
  };

  const menuLinks = (
    <>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              backgroundColor: isActive ? "transparent" : "",
              // border: isActive ? "1px solid #23BE0A" : "",
              color: isActive ? "green" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              backgroundColor: isActive ? "transparent" : "",
              // border: isActive ? "1px solid #23BE0A" : "",
              color: isActive ? "green" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        ></NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-slate-900">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Peak Market</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuLinks}</ul>
      </div>
      {!user && (
        <div className="navbar-end gap-3">
          <Link to="/login">
            <a className="btn">Login</a>
          </Link>
          <Link to="/register">
            <a className="btn">Register</a>
          </Link>
        </div>
      )}
      {user && (
        <div className="navbar-end gap-3">
          
          <button onClick={handleLogOut}>
            <a className="btn">Log Out</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
