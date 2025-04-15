import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        My Appointment
      </h2>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-lg font-medium text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-sm text-gray-500">{item.docData.speciality}</p>

              <p className="text-sm text-gray-700 mt-2 font-semibold">
                <span className="text-blue-600">Date & Time:</span>{" "}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div className="ml-auto flex flex-col space-y-2">
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              )}
              {item.cancelled && (
                <button className=" line-through px-4 py-2 bg-gray-500  rounded-lg text-red-800 transition">
                  cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
