import Attendence from "../models/Attendence.js";
import Employee from "../models/Employee.js";

const defaultAttendence = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const existingAttendence = await Attendence.findOne({ date });

        if(!existingAttendence) {
            const employees = await Employee.find({});
            const attendence = await employees.map(employee => ({ date, employeeId: employee._id, status: null }));

            await Attendence.insertMany(attendence);
        }
        next();

    }catch(error) {
        res.status(500).json({success: false, error: error});
    }
}

export default defaultAttendence;

