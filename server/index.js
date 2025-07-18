import cors from 'cors';
import express from "express";
import connectToDatabase from './db/db.js';
import attendenceRouter from './routes/attendence.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import leaveRouter from './routes/leave.js';
import salaryRouter from './routes/salary.js';
import settingRouter from './routes/setting.js';

connectToDatabase()
const app = express()
app.use(cors({
    origin: 'https://ems-project2-ui.onrender.com',
    credentials: true
}))
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter);
app.use('/api/attendence', attendenceRouter);
app.use('/api/dashboard', dashboardRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});