import { useState } from "react";
import genMultipleToasts from "../utils/genMultipleToasts";
import validate from "../utils/validate";

const useForm = () => {
  const [formData, setFormData] = useState({});

  const onFormSubmit = (schema, operation) => async (e) => {
    e.preventDefault();
    const res = await validate(schema, formData);
    if (res) {
      genMultipleToasts(Object.values(res), "error");
      return;
    }
    await operation();
  };

  const onFormChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return { formData, onFormSubmit, onFormChange };
};

export default useForm;
