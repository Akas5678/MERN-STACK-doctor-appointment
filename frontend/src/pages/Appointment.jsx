import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dayOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    console.log("Route param docId:", docId);
    console.log(
      "All doctor IDs:",
      doctors.map((doc) => doc._id)
    );
    setDocInfo(docInfo);
    console.log("Selected doctor info:", docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let hour = currentDate.getHours();
        if (hour >= 13 && hour < 16) {
          currentDate.setHours(16);
          continue;
        }

        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Fetch doctor info once doctors are available
  useEffect(() => {
    if (doctors.length > 0 && docId) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  // Fetch slots once doctor info is available
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // DEBUG: See slots in console
  useEffect(() => {
    console.log("Doctor slots:", docSlots);
  }, [docSlots]);

  // Show loading while doctor info is fetching
  if (!docInfo) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-600 text-lg">
        Loading doctor information...
      </div>
    );
  }

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6 items-center bg-white shadow-lg p-6 rounded-lg">
        <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-full border-2 border-gray-300">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <p>{docInfo.name}</p>
            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-5 h-5"
            />
          </div>
          <p className="text-gray-600 mt-1">
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Experience: {docInfo.experience}
          </p>
          <div className="mt-4">
            <p className="flex items-center gap-1 font-medium text-gray-700">
              About{" "}
              <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 text-sm mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-2 font-semibold">
            Appointment Fees: {currency} <span>{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="mt-6 font-medium text-gray-700">
        <p className="text-lg font-semibold text-center">Booking Slots</p>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
            {docSlots.length > 0 &&
              docSlots.slice(0, 7).map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 text-center rounded-lg cursor-pointer transition-all duration-300 
                    ${
                      slotIndex === index
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => setSlotIndex(index)}
                >
                  <p className="text-sm font-semibold">
                    {item.length > 0 && item[0].datetime
                      ? dayOfWeeks[item[0].datetime.getDay()]
                      : "N/A"}
                  </p>

                  <p className="text-lg font-bold">
                    {item.length > 0 && item[0].datetime
                      ? item[0].datetime.getDate()
                      : "--"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-700 text-center mb-2">
          Available Time Slots
        </p>
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 px-2 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots[slotIndex] &&
            docSlots[slotIndex].map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-2 py-2 min-w-[80px] text-center font-medium rounded-lg cursor-pointer transition-all duration-300 shadow-md
                  ${
                    slotTime === item.time
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
              >
                {item.time}
              </div>
            ))}
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
            ${
              slotTime
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          📅 Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
