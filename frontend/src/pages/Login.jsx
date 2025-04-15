import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          email,
          password,
          name,
        });

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      className="min-h-[80vh] flex flex-items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          {" "}
          Please {state === "sign up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p> Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="w-full">
          <p> Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p> Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="text-center mt-4 text-gray-600">
            {" "}
            Already have an Account ?{" "}
            <span
              className="text-primary cursor-pointer ml-1 font-medium hover:underline transition"
              onClick={() => setState("Login")}
            >
              {" "}
              Login Here{" "}
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-gray-600">
            {" "}
            Don't have an Account ?{" "}
            <span
              className="text-primary cursor-pointer ml-1 font-medium hover:underline transition"
              onClick={() => setState("Sign Up")}
            >
              {" "}
              Sign Up Here{" "}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
