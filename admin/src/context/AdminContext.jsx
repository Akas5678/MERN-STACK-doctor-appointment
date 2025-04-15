// AdminContext.jsx
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : null
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // if using Vite
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching doctors.");
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message); // Corrected: Using `data.message` here instead of `error.message`
      }
    } catch (error) {
      // Capture the error here
      toast.error(error.message); // Correctly reference the error message
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",

        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching doctors.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while cancelling appointment.");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        setAToken,
        backendUrl,
        aToken,
        getAllDoctors,
        doctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
