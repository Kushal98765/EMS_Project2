import express from 'express';
import { attendenceReport, getAttendence, updateAttendence } from '../controllers/attendenceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import defaultAttendence from '../middleware/defaultAttendence.js'; 

const router = express.Router()

router.get('/', authMiddleware, defaultAttendence, getAttendence);
router.put('/update/:employeeId', authMiddleware, updateAttendence);
router.get('/report', authMiddleware, attendenceReport);

export default router;
