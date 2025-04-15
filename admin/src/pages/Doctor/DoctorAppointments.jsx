import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/Appcontext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-gray-900 w-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-lg">
          All Appointments
        </h2>

        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
          {/* Table Header - Only visible on md+ */}
          <div className="hidden md:grid grid-cols-[40px_1.5fr_0.5fr_1.5fr_0.8fr_1fr] gap-4 text-sm md:text-base font-semibold text-white bg-white/30 px-6 py-4 border-b border-white/30">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* Appointment Rows - md and up */}
          <div className="hidden md:block">
            {Array.isArray(appointments) &&
              appointments.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[40px_1.5fr_0.5fr_1.5fr_0.8fr_1fr] gap-4 items-center px-6 py-4 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition rounded-lg mb-2"
                >
                  <p className="font-semibold">{index + 1}</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt="Patient"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                    <p className="truncate">{item.userData.name}</p>
                  </div>

                  <p>{calculateAge(item.userData.dob)}</p>

                  <p className="truncate">
                    {item.slotDate}, {item.slotTime}
                  </p>

                  <p className="font-semibold text-green-300">${item.amount}</p>

                  {item.cancelled ? (
                    <p>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p>Completed</p>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        className="p-2 bg-red-100/70 rounded-full shadow hover:bg-red-200 transition"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        <img
                          src={assets.cancel_icon}
                          alt="Cancel"
                          className="w-5 h-5"
                        />
                      </button>
                      <button
                        className="p-2 bg-green-100/70 rounded-full shadow hover:bg-green-200 transition"
                        onClick={() => completeAppointment(item._id)}
                      >
                        <img
                          src={assets.tick_icon}
                          alt="Approve"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Mobile View - Card Format */}
          <div className="md:hidden p-4 space-y-4">
            {Array.isArray(appointments) &&
              appointments.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/20 text-white backdrop-blur-lg p-4 rounded-xl shadow-lg space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt="Patient"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {item.userData.name}
                      </p>
                      <p className="text-sm">
                        Age: {calculateAge(item.userData.dob)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm">
                      <strong>Date:</strong> {item.slotDate}
                    </p>
                    <p className="text-sm">
                      <strong>Time:</strong> {item.slotTime}
                    </p>
                    <p className="text-sm text-green-200">
                      <strong>Fees:</strong> ${item.amount}
                    </p>
                  </div>

                  <div className="pt-2">
                    {item.cancelled ? (
                      <p className="text-red-300 font-semibold">Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className="text-green-300 font-semibold">Completed</p>
                    ) : (
                      <div className="flex gap-4 mt-2">
                        <button
                          className="p-2 bg-red-100/70 rounded-full shadow hover:bg-red-200 transition"
                          onClick={() => cancelAppointment(item._id)}
                        >
                          <img
                            src={assets.cancel_icon}
                            alt="Cancel"
                            className="w-5 h-5"
                          />
                        </button>
                        <button
                          className="p-2 bg-green-100/70 rounded-full shadow hover:bg-green-200 transition"
                          onClick={() => completeAppointment(item._id)}
                        >
                          <img
                            src={assets.tick_icon}
                            alt="Approve"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Fallback if no appointments */}
          {(!appointments || appointments.length === 0) && (
            <p className="text-white text-center py-10">No appointments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
