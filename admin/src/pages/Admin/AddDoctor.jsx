import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docimg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docimg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", docimg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key} , ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctors",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            aToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 year");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setDegree("");
        setFees("");
        setSpeciality("General physician");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-3xl shadow-2xl"
    >
      <p className="text-3xl font-bold text-center mb-6 text-gray-800 drop-shadow-lg">
        Add doctor
      </p>

      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="doc-img"
            className="cursor-pointer transition transform hover:scale-105"
          >
            <img
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
              alt=""
              className="w-32 h-32 object-cover rounded-full border-4 border-dashed border-gray-300 shadow-lg"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-gray-500 text-sm text-center">
            upload doctor <br /> picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700">Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Doctor E-mail</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="E-mail"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Doctor Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="fees"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700">speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option value="General physician ">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians ">Pediatricians</option>
                <option value="Neurologist ">Neurologist</option>
                <option value="Gastroenterlogist ">Gastroentrologist</option>
              </select>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Doctor Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="address1"
                required
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="address2"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700">About</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
