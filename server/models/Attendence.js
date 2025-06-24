import mongoose from 'mongoose';

const AttendenceSchema = new mongoose.Schema({
    date: {
        type: String, // format "yyyy-mm-dd"
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Sick", "Leave"],
        default: null
    }
})

const Attendence = mongoose.model("Attendence", AttendenceSchema)
export default Attendence;

