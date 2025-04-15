import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="p-6 space-y-10 w-full bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: assets.doctor_icon,
              label: "Doctors",
              value: dashData.totalDoctors,
            },
            {
              icon: assets.appointments_icon,
              label: "Appointments",
              value: dashData.totalAppointments,
            },
            {
              icon: assets.patients_icon,
              label: "Patients",
              value: dashData.totalUsers,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 flex items-center gap-4 hover:-rotate-1"
            >
              <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-3 rounded-xl shadow-md">
                <img src={stat.icon} alt={stat.label} className="w-10 h-10" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-6 space-x-3">
            <img src={assets.list_icon} alt="List" className="w-6 h-6" />
            <h3 className="text-xl font-semibold text-gray-800 tracking-wide">
              Latest Bookings
            </h3>
          </div>

          <div className="space-y-5">
            {dashData.latestAppointments.length === 0 ? (
              <p className="text-gray-500">No recent bookings.</p>
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015]"
                >
                  {/* Doctor Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.docData.image}
                        alt={item.docData.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <span className="absolute bottom-0 right-0 bg-green-400 h-3 w-3 rounded-full border-2 border-white shadow-sm"></span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-lg font-semibold text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.slotDate} at {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* Action or Status */}
                  <div className="flex items-center space-x-3">
                    {item.cancelled ? (
                      <span className="text-sm font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full shadow-sm animate-pulse">
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        title="Cancel Appointment"
                        className="group"
                      >
                        <img
                          src={assets.cancel_icon}
                          alt="Cancel"
                          className="w-8 h-8 transition-transform transform group-hover:scale-110 group-hover:rotate-12"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
