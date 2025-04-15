import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Doctors
      </h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6 justify-start">
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-[0.5deg] group w-[250px]"
            >
              <img
                src={item.image}
                alt="Doctor"
                className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 group-hover:brightness-90 group-hover:grayscale-[20%]"
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-indigo-400 transition-colors duration-300">
                  {item.speciality}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.availability}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
