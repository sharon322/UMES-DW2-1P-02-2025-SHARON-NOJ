import { Router } from 'express';
import { getMotocicletas, createMotocicleta } from '../controllers/motocicletaController.js';

const router = Router();

router.get('/', getMotocicletas);
router.post('/', createMotocicleta);

export default router;