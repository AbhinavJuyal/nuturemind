import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";

import { USER_PROFILE } from "../utils/constants";

const UserAvatar = ({ user }) => {
  const [firstName, lastName] = user?.fullName?.split(" ");
  const { operation: signOut } = useAxios("/auth/signout");
  const navigate = useNavigate();

  const signOutUser = async () => {
    window.localStorage.removeItem(USER_PROFILE);
    await signOut();
    navigate("/signin");
  };

  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <div className="cursor-pointer py-3 px-4" tabIndex={0}>
            <div className="avatar">
              <div className="w-10 mask mask-squircle">
                <img
                  src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=377CFB&color=fff`}
                />
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="bg-white p-2 dropdown-content menu drop-shadow-[0px_0px_25px_rgba(0,0,0,0.25)] rounded-box w-52"
          >
            <li className="hover:bg-primary hover:text-white">
              <Link to="/results">
                <a>Report</a>
              </Link>
            </li>
            <li
              onClick={() => signOutUser()}
              className="hover:bg-primary hover:text-white"
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default UserAvatar;
