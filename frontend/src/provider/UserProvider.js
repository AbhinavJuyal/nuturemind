import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";

import { USER_PROFILE } from "../utils/constants";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const {
    data,
    operation: getUser,
    error,
  } = useAxios("/user", "GET", null, false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    await getUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error, "error");
      console.log(error.response.data.message);
      window.localStorage.removeItem(USER_PROFILE);
      // navigate("/");
    }
  }, [error]);

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  const getUserValue = useCallback(() => {
    let user = localStorage.getItem(USER_PROFILE);
    if (data) {
      return data.user;
    }
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }, [data]);

  const value = {
    user: getUserValue(),
    fetchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
