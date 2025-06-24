import Attendence from '../models/Attendence.js';
import Employee from '../models/Employee.js';

// Get all employees and today's attendance
const getAttendence = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const allEmployees = await Employee.find().populate("userId department");
    const todayAttendence = await Attendence.find({ date });

    const attendanceMap = {};
    todayAttendence.forEach(record => {
      attendanceMap[record.employeeId.toString()] = record.status;
    });

    const attendence = allEmployees.map(emp => ({
      employeeId: emp,
      status: attendanceMap[emp._id.toString()] || null,
    }));

    return res.status(200).json({ success: true, attendence });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Fix: use _id and upsert if not exists
const updateAttendence = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split('T')[0];

    const attendence = await Attendence.findOneAndUpdate(
      { employeeId, date },
      { employeeId, status, date },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, attendence });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const attendenceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) query.date = date;

    const attendenceDate = await Attendence.find(query)
      .populate({ path: "employeeId", populate: ["department", "userId"] })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendenceDate.reduce((result, record) => {
      const emp = record.employeeId;
      if (!emp || !emp.userId || !emp.department) return result;

      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: emp.employeeId || "N/A",
        employeename: emp.userId.name,
        departmentName: emp.department.dep_name,
        status: record.status || "Not marked"
      });

      return result;
    }, {});

    return res.status(201).json({ success: true, groupData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendence, updateAttendence, attendenceReport };



























// import Attendence from '../models/Attendence.js';
// import Employee from '../models/Employee.js';


// const getAttendence = async (req, res) => {
//   try {
//     const date = new Date().toISOString().split('T')[0];

//     // Get all employees with userId and department populated
//     const allEmployees = await Employee.find().populate("userId department");

//     // Get today's attendance records
//     const todayAttendence = await Attendence.find({ date });

//     // Map to quickly lookup attendance by employee _id
//     const attendanceMap = {};
//     todayAttendence.forEach(record => {
//       attendanceMap[record.employeeId.toString()] = record.status;
//     });

//     // Build final list
//     const attendence = allEmployees.map(emp => ({
//       employeeId: emp,
//       status: attendanceMap[emp._id.toString()] || null, // null if not marked
//     }));

//     return res.status(200).json({ success: true, attendence });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // const getAttendence = async (req, res) => {
// //     try {
// //         const date = new Date().toISOString().split('T')[0];

// //         const attendence = await Attendence.find({date}).populate({
// //             path: "employeeId",
// //             populate: [
// //                 "department",
// //                 "userId"
// //             ]
// //         })
// //         res.status(200).json({success: true, attendence})
// //     }catch(error) {
// //         res.status(500).json({success: false, meassage: error.meassage})
// //     }
// // }

// const updateAttendence = async (req, res) => {
//     try {
//         const {employeeId} = req.params;
//         const {status} = req.body;
//         const date = new Date().toISOString().split('T')[0];
//         const employee = await Employee.findOne({ employeeId });

//         const attendence = await Attendence.findOneAndUpdate({employeeId: employee._id, date}, {status}, {new: true})

//         res.status(200).json({success: true, attendence})
//     }catch(error) {
//         res.status(500).json({success: false, message: error.message})
//     }
// }

// const attendenceReport = async (req, res) => {
//     try {
//         const {date, limit = 5, skip = 0 } = req.query;
//         const query = {};

//         if(date) {
//             query.date = date;
//         }

//         const attendenceDate = await Attendence.find(query).populate({
//             path: "employeeId",
//             populate: [
//                 "department", 
//                 "userId"
//             ]
//         }).sort({date: -1}).limit(parseInt(limit)).skip(parseInt(skip))

//         const groupData = attendenceDate.reduce((result, record) => {
//             const emp = record.employeeId;

//             if (!emp || !emp.userId || !emp.department) return result;

//             if(!result[record.date]) {
//                 result[record.date] = [];
//             }
//             result[record.date].push({
//                 employeeId: record.employeeId?.employeeId || "N/A",
//                 employeename: record.employeeId?.userId?.name,
//                 departmentName: record.employeeId?.department?.dep_name || "N/A",
//                 status: record.status || "Not marked"
//             });
//             return result;
//         }, {})
//         return res.status(201).json({success: true, groupData})
//     }catch(error) { 
//         res.status(500).json({success: false, message: error.message});
//     }
// }


// export {getAttendence, updateAttendence, attendenceReport};