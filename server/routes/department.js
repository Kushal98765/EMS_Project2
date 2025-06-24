import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router()

router.post('/add', authMiddleware, roleMiddleware('admin'), addDepartment);
router.get('/', authMiddleware, roleMiddleware('admin'), getDepartments);
router.get('/:id', authMiddleware, roleMiddleware('admin'), getDepartment);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateDepartment);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteDepartment);


export default router;