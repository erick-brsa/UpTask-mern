import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    const { project } = req.body;

    const existingProject = await Project.findById(project);

    if (!existingProject) {
        const error = new Error('El proyecto no existe');
        return res.status(400).json({ message: error.message });
    }

    if (existingProject.creator.toString() !== req.user._id.toString()) {  
        const error = new Error('No tienes permisos para crear tareas en este proyecto');
        return res.status(400).json({ message: error.message });
    }

    try {
        const task = await Task.create(req.body);
        existingProject.tasks.push(task);
        await existingProject.save();
        return res.status(201).json(task);
    } catch (error) {
        console.log(error);
    }
};

export const getTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate('project');

    if (!task) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ message: error.message });
    }

    res.json(task);
};

export const updateTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate('project');

    if (!task) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ message: error.message });
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;
    task.dateDelivery = req.body.dateDelivery || task.dateDelivery;

    try {
        const savedTask = await task.save();
        return res.json(savedTask);
    } catch (error) {
        console.log(error);
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate('project');

    if (!task) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ message: error.message });
    }

    try {
        const project = await Project.findById(task.project);
        project.tasks.pull(task._id);
        await Promise.allSettled([await project.save(), await task.deleteOne()]);
        return res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        console.log(error);
    }
};

export const changeStatus = async (req, res) => {
    const { id } = req.params;
    
    const task = await Task.findById(id).populate('project');
    
    if (!task) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }
    
    if (task.project.creator.toString() !== req.user._id.toString() && !task.project.members.some(m => m._id.toString() === req.user._id.toString())) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ message: error.message });
    }
    
    try {
        task.status = !task.status;
        task.completed = req.user._id;
        await task.save();
        const savedTask = await Task.findById(id)
            .populate('project')
            .populate('completed');
        return res.json(savedTask);
    } catch (error) {
        console.log(error);
    }
};