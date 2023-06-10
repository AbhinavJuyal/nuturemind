import { useEffect, useState } from "react";
import axios from "axios";
import genMultipleToasts from "../utils/genMultipleToasts";

const useAxios = (endpoint, method = "GET", body = null, genErrors = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  const baseURL = "http://localhost:5000";
  
  const operation = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        url: `${baseURL}${endpoint}`,
        method,
        data: body,
        withCredentials: true,
      });

      setData(response.data);
      setLoading(false);
      setCompleted(true);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!genErrors) return;
    if (error) {
      console.log(error, "handling")
      const values = [error.response.data.error];
      genMultipleToasts(values, "error");
      console.log(error)
    }
  }, [error]);

  return { data, loading, error, completed, operation };
};

export default useAxios;
