import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData && typeof profileData.address === "string") {
      let addressObj;
      try {
        addressObj = JSON.parse(profileData.address);
      } catch {
        addressObj = { line1: "", line2: "" };
      }

      // Only update if the address is different from the parsed address
      if (JSON.stringify(profileData.address) !== JSON.stringify(addressObj)) {
        setProfileData({ ...profileData, address: addressObj });
      }
    }
  }, [profileData]);

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id,
        address: profileData.address,
        fees: profileData.fees,
        availability: profileData.availability,
        experience: profileData.experience,
        about: profileData.about,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctors/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        await getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  if (!profileData) return null;

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-md border-2 border-blue-300">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
              {profileData.name}
            </h2>
            <p className="text-gray-600 text-lg">
              {profileData.degree} - {profileData.speciality}
            </p>

            <div>
              <h3 className="font-semibold text-gray-700">Experience:</h3>
              {isEdit ? (
                <input
                  type="number"
                  className="border rounded-md px-3 py-1 w-full"
                  value={profileData.experience}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-500 bg-blue-100 inline-block px-3 py-1 rounded-full shadow-sm">
                  {profileData.experience} years experience
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">About:</h3>
              {isEdit ? (
                <textarea
                  className="border rounded-md px-3 py-2 w-full"
                  rows="3"
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-600">{profileData.about}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-500">
                Appointment Fees:
              </h3>
              {isEdit ? (
                <input
                  type="number"
                  className="border rounded-md px-3 py-1 w-full"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="font-bold text-blue-500">${profileData.fees}</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Address:</h3>
              <div className="space-y-2">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      placeholder="Line 1"
                      className="border rounded-md px-3 py-1 w-full"
                      value={profileData.address?.line1 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Line 2"
                      className="border rounded-md px-3 py-1 w-full"
                      value={profileData.address?.line2 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  </>
                ) : (
                  <p className="text-gray-600">
                    {profileData.address?.line1}
                    <br />
                    {profileData.address?.line2}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                checked={profileData.availability}
                onChange={(e) =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    availability: e.target.checked,
                  }))
                }
                className="accent-blue-600 scale-125"
              />
              <label className="text-gray-700 font-medium">Available</label>
            </div>

            <div className="mt-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
