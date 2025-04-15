import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const onSubmitHandler = async (e) => {
    console.log("backendUrl", backendUrl);

    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctors/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log("Doctor token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <p className="text-center text-2xl font-semibold text-gray-700 mb-6">
          <span className="font-bold text-blue-600">{state}</span> login
        </p>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log in
        </button>
        {state === "Admin" ? (
          <p>
            {" "}
            Doctor Login?{" "}
            <span
              className="underline cursor-pointer p-2"
              onClick={() => setState("Doctor")}
            >
              {" "}
              click here{" "}
            </span>
          </p>
        ) : (
          <p>
            {" "}
            Admin Login?{" "}
            <span
              className="underline cursor-pointer p-2"
              onClick={() => setState("Admin")}
            >
              {" "}
              click here{" "}
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
