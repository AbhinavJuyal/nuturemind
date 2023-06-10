import React from "react";
import { Link } from "react-router-dom";

const SignInUpBtns = () => {
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">
            <button className="btn btn-active btn-primary">Sign In</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SignInUpBtns;
