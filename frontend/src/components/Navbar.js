import React from "react";

import { useUser } from "../provider/UserProvider";

import SignInUpBtns from "./SignInUpBtns";
import UserAvatar from "./UserAvatar";

import logo from "../assets/logo.jpg";
import { isObjectEmpty } from "../utils/isObjectEmpty";
import { Link } from "react-router-dom";

const Navbar = ({ transparentBg }) => {
  const { user } = useUser();

  return (
    <div
      className={`navbar px-64 ${
        transparentBg
          ? "bg-transparent hover:bg-base-100 transition-colors ease-in-out"
          : "bg-base-100"
      }`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl flex items-center gap-4 px-0 hover:bg-white">
          <img src={logo} width={52} height={52} />
          {!transparentBg && <span>NutureMind</span>}
        </a>
      </div>
      <ul className="menu menu-horizontal px-1">
        {/* <li>
          <Link to="/resources">Resources</Link>
        </li> */}
      </ul>
      {!isObjectEmpty(user) ? <UserAvatar user={user} /> : <SignInUpBtns />}
    </div>
  );
};

export default Navbar;
