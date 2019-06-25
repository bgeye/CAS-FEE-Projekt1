import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController.mjs';

router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.createNote.bind(notesController));
router.get("/:id", notesController.getNoteById.bind(notesController));
router.put("/:id", notesController.updateNote.bind(notesController));
router.patch("/:id", notesController.updateNoteStatus.bind(notesController));


export const noteRoutes = router;