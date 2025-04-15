import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/Appcontext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Appointments
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px] bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-x-3 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 font-semibold text-xs uppercase px-6 py-4 rounded-t-2xl border-b border-gray-200 shadow-inner">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Doctor</p>
            <p>Date</p>
            <p>Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* Table Body */}
          {appointments.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-8 gap-x-3 items-center px-6 py-3 text-sm ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:scale-[1.01] hover:shadow-md transition-all duration-300`}
            >
              <p className="font-medium text-gray-700">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.userData?.image || "/placeholder.png"}
                  alt={item.userData?.name || "N/A"}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <p className="truncate">{item.userData?.name || "N/A"}</p>
              </div>

              <p>{calculateAge(item.userData?.dob) || "N/A"}</p>

              {/* Doctor */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.docData?.image || "/placeholder.png"}
                  alt={item.docData?.name || "N/A"}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <p className="truncate">{item.docData?.name || "N/A"}</p>
              </div>

              <p>{item.slotDate || "N/A"}</p>
              <p className="text-xs text-gray-600">{item.slotTime || "N/A"}</p>

              <p className="text-green-600 font-semibold">
                ${item.amount || "0.00"}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium"> Cancelled </p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer "
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;
