import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId, deleteEmployee } from '../controllers/employeeController.js'
import roleMiddleware from '../middleware/roleMiddleware.js';


const router = express.Router()

router.post('/add', authMiddleware, roleMiddleware('admin'), upload.single('image'), addEmployee);
router.get('/', authMiddleware, roleMiddleware('admin'), getEmployees);
router.get('/:id', authMiddleware, roleMiddleware('admin', 'employee'), getEmployee);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateEmployee);
router.get('/department/:id', authMiddleware, roleMiddleware('admin'), fetchEmployeesByDepId);
// Route: DELETE /api/employee/:id
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteEmployee);



export default router;