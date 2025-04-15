import jwt from "jsonwebtoken";
import doctorModel from "../models/doctormodel.js";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentmodel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      availability: !docData.availability,
    });
    res.json({ success: true, message: "Availability updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorData = await doctorModel.findOne({ email });
    if (!doctorData) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(password, doctorData.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      const token = jwt.sign({ id: doctorData._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
    res.json({ success: true, doctorData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    if (!appointments) {
      return res.json({
        success: false,
        message: "No appointments found",
      });
    }
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "cancel failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, availability, experience, about } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      availability,
      experience,
      about,
    });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};
export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
