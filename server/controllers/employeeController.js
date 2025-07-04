import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";
import User from '../models/User.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {  
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })



// const addEmployee = async (req, res) => {
//     try {
//         const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

//         console.log("Incoming data:", req.body);
//         console.log("Uploaded file:", req.file);

//         const user = await User.findOne({ email })
//         if (user) {
//             return res.status(400).json({ success: false, error: 'user already registered in emp' });
//         }
//         const hashPassword = await bcrypt.hash(password, 10)

//         const newUser = new User({
//             name, email, password: hashPassword, role,
//             profileImage: req.file ? req.file.filename : ""
//         })
//         const savedUser = await newUser.save();

//         const newEmployee = new Employee({
//             userId: savedUser._id,
//             employeeId, dob, gender, maritalStatus, designation, department, salary
//         })

//         await newEmployee.save();
//         return res.status(200).json({success: true, message: "employee created"})

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({success: false, error: 'server error in adding employee'})
//     }
// }


const addEmployee = async (req, res) => {
    try {
        const {
            name, email, employeeId, dob,
            gender, maritalStatus, designation,
            department, salary, password, role
        } = req.body;

        console.log("Incoming data:", req.body);
        console.log("Uploaded file:", req.file);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: 'User already registered in emp' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file?.filename || ""
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();

        console.log("New Employee created");
        return res.status(200).json({ success: true, message: "employee created" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({success: true, employees})
    } catch(error) {
        return res.status(500).json({success: false, error: 'get employees server error'})
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate("department");
        if(!employee) {
        employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate("department");
        }
        return res.status(200).json({success: true, employee})
    } catch(error) {
        return res.status(500).json({success: false, error: 'get employees server error'})
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, maritalStatus, designation, department, salary } = req.body;

        const employee = await Employee.findById({ _id: id });
        if(!employee) {
            return res.status(404).json({ success: false, error: "employee not found" });
        }

        const user = await User.findById({ _id: employee.userId })
        if(!user) {
            return res.status(404).json({ success: false, error: "user not found" });
        }

        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id}, {
            maritalStatus, designation, department
        })       
        
        if(!updateEmployee || !updateUser) {
            return res.status(404).json({ success: false, error: "document not found" });
        }
        return res.status(200).json({success: true, message: "employee update"})

    } catch (error) {
        return res.status(500).json({success: false, error: 'update employees server error'})
    }
};


const fetchEmployeesByDepId = async (req, res) => {
     const {id} = req.params;
    try {
        const employees = await Employee.find({ department: id })
        return res.status(200).json({ success: true, employees })
    } catch(error) {
        return res.status(500).json({success: false, error: 'get employeesbyDepId server error'})
    }
}

// const deleteEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Employee.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Employee deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find the employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Step 2: Delete the associated user
    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId);
    }

    // Step 3: Delete the employee
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Employee and user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


  

export { addEmployee, fetchEmployeesByDepId, getEmployee, getEmployees, updateEmployee, deleteEmployee, upload };

