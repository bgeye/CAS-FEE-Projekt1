import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController.mjs';

router.get("/", notesController.getNotes.bind(notesController));


export const noteRoutes = router;