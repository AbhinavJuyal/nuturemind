import React, { useEffect } from "react";
import { ReactComponent as Doodle2 } from "../assets/doodle2.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import useForm from "../hooks/useForm";
import Loader from "../components/Loader";

const FULL_NAME = "fullName";
const EMAIL = "email";
const PASSWORD = "password";

const SignUp = () => {
  const { formData, onFormSubmit, onFormChange } = useForm();
  const {
    data,
    loading,
    completed,
    operation: registerUser,
  } = useAxios("/auth/signup", "POST", formData);
  const navigate = useNavigate();

  useEffect(() => {
    if (completed && data) {
      toast.success(data.message);
      data && navigate("/signin");
    }
  }, [completed, data]);

  return (
    <div className="w-full h-screen flex items-center bg-base-200">
      <div className="h-full bg-primary flex-shrink-0">
        <Doodle2 className="w-full h-full" />
      </div>
      <div className="w-full h-full flex flex-col justify-center ml-80">
        <h1 className="font-bold text-5xl mb-4">Register</h1>
        <h4 className="text-xl">
          Take your first steps towards better
          <br />
          mental health.
        </h4>
        <form
          onSubmit={onFormSubmit("signUpSchema", registerUser)}
          onChange={onFormChange}
        >
          <div className="flex-shrink-0 w-full max-w-sm">
            <div className="py-6 pl-0">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  name={FULL_NAME}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  name={EMAIL}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name={PASSWORD}
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {loading ? <Loader /> : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
