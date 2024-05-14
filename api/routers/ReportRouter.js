import express from 'express';
import multer from 'multer';
import { processReport } from '../controllers/ReportController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-report', upload.single('file'), processReport);

export default router;