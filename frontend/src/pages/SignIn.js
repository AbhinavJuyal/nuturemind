import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Doodle } from "../assets/doodle.svg";
import Loader from "../components/Loader";
import useAxios from "../hooks/useAxios";
import useForm from "../hooks/useForm";
import { USER_PROFILE } from "../utils/constants";

const EMAIL = "email";
const PASSWORD = "password";

const SignIn = () => {
  const { formData, onFormSubmit, onFormChange } = useForm();
  const {
    data,
    loading,
    completed,
    operation: loginUser,
  } = useAxios("/auth/signin", "POST", formData);
  const navigate = useNavigate();

  useEffect(() => {
    if (completed && data) {
      toast.success(data.message);
      window.localStorage.setItem(USER_PROFILE, JSON.stringify(data.user));
      data && navigate("/dashboard");
    }
  }, [completed, data]);

  return (
    <div className="w-full h-screen flex items-center bg-base-200">
      <div className="h-full bg-primary flex-shrink-0">
        <Doodle className="w-full h-full" />
      </div>
      <div className="w-full h-full flex flex-col justify-center ml-80">
        <h1 className="font-bold text-5xl mb-6">Login</h1>
        <form
          onSubmit={onFormSubmit("signInSchema", loginUser)}
          onChange={onFormChange}
        >
          <div className="flex-shrink-0 w-full max-w-sm">
            <div className="py-6 pl-0">
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
                <button className="btn btn-primary">
                  {loading ? <Loader /> : "Sign In"}
                </button>
              </div>
              <div className="text-center text-base mt-8">
                Don't have an account.{" "}
                <span className="text-blue-600">
                  <a href="/signup">Create Account?</a>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
