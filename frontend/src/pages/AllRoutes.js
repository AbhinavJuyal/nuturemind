import React from "react";
import { Routes, Route } from "react-router-dom";

import { useUser } from "../provider/UserProvider";

import Landing from "./Landing";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Face from "./Face";
import Dass from "./Dass";
import Results from "./Results";
import Dashboard from "./Dashboard";
import Resources from "./Resources";
import ProtectedRoute from "./ProtectedRoute";

import { isObjectEmpty } from "../utils/isObjectEmpty";

const AllRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isObjectEmpty(user)}
            redirectTo={"/dashboard"}
          />
        }
      >
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={!isObjectEmpty(user)}
            redirectTo={"/"}
          />
        }
      >
        <Route path="/dass" element={<Dass />} />
        <Route path="/face" element={<Face />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
};

export default AllRoutes;
