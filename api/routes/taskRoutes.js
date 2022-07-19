import express from 'express';

import { 
    createTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus
} from '../controllers/taskController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, createTask);

router
    .route('/:id')
    .get(checkAuth, getTask)
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask);

router.post('/:id', checkAuth, changeStatus);

export default router;