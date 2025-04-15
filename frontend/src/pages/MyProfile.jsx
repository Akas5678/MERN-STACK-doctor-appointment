import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  return (
    userData && (
      <div className="max-w-lg mx-auto p-6 bg-zinc-300 shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          {edit ? (
            <label htmlFor="image">
              <div>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          )}

          {edit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-2 border rounded px-2 py-1"
            />
          ) : (
            <p className="mt-2 text-lg font-semibold">{userData.name}</p>
          )}
        </div>
        <hr className="my-4" />

        <div>
          <p className="text-gray-600 font-semibold">CONTACT INFORMATION</p>
          <div className="mt-2">
            <p className="text-gray-500">Email</p>
            {edit ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p>{userData.email}</p>
            )}

            <p className="text-gray-500 mt-2">Phone</p>
            {edit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p className="text-gray-500 mt-2">Address</p>
            {edit ? (
              <div>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full border rounded px-2 py-1 mb-2"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ) : (
              <p>
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 font-semibold">BASIC INFORMATION</p>
          <div className="mt-2">
            <p className="text-gray-500">Gender</p>
            {edit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="w-full border rounded px-2 py-1"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="text-gray-500 mt-2">Birth Date</p>
            {edit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          {edit ? (
            <button
              onClick={updateUserProfileData}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
