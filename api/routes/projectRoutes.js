import express from 'express';

import {
    getProjects,
    getProject,
    newProject,
    updateProject,
    deleteProject,
    addMember,
    removeMember,
    getTasks
} from '../controllers/projectController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router
    .route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject);

router
    .route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject);

router.get('/tasks/:id', checkAuth, getTasks);
router.post('add-member/:id', checkAuth, addMember);
router.post('remove-member/:id', checkAuth, removeMember);

export default router;