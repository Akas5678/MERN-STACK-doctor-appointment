import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctormodel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentmodel.js";
import userModel from "../models/userModel.js";

// Add Doctor Controller
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload Image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // Create Doctor
    const doctordata = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    });

    await doctordata.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin Login Controller
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });
    res.json({ success: true, message: "Appointment cancelled successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      totalDoctors: doctors.length,
      totalUsers: users.length,
      totalAppointments: appointments.length,
      latestAppointments: appointments.slice(-5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
