import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Specialties List */}
      <div className="w-full md:w-1/5 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Specialities</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            General Physician
          </button>
          <button
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            Gynecologist
          </button>
          <button
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            Dermatologist
          </button>
          <button
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            Pediatricians
          </button>
          <button
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            Neurologist
          </button>
          <button
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className="hover:scale-110 px-4 py-2 text-black border border-black rounded-lg transition-transform"
          >
            Gastroenterologist
          </button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          >
            {/* Doctor Image */}
            <img
              className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-blue-500"
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Info */}
            <div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-semibold">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <p>Available</p>
              </div>
              <p className="text-lg font-semibold mt-2">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
