import express from 'express';

import {
    getProjects,
    getProject,
    newProject,
    updateProject,
    deleteProject,
    findMember,
    addMember,
    removeMember
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

router.post('/members', checkAuth, findMember);
router.post('/members/:id', checkAuth, addMember);
router.delete('/members/:id', checkAuth, removeMember);


export default router;