import Project from '../models/Project.js';
import User from '../models/User.js';

export const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        const savedProject = await project.save();
        res.json(savedProject);
    } catch (error) {
        console.log(error);
    }
};

export const getProjects = async (req, res) => {
    const projects = await Project.find({
        '$or': [
            { 'members': {$in: req.user}},
            { 'creator': {$in: req.user}}
        ]
    })
        .select("-tasks");
    res.json(projects);
};

export const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id)
        .populate('tasks')
        .populate('members', '_id name email');
    
    if (!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString() && !project.members.some(m => m._id.toString() === req.user._id.toString())) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }

    res.json(project);
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    
    if (!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }
    
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.dateDelivery = req.body.dateDelivery || project.dateDelivery;
    project.client = req.body.client || project.client;

    try {
        const savedProject = await project.save();
        res.json(savedProject);
    } catch (error) {
        console.log(error);
    }  
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    
    if (!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }
    
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }

    try {
        await project.deleteOne();
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error);
    }
};

export const findMember = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email }).select('_id name email');
    if (!user) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ message: error.message });
    }
    res.json(user);
};

export const addMember = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }

    const { email } = req.body

    const user = await User.findOne({ email }).select('_id name email');

    if (!user) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() === user._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser colaborador');
        return res.status(402).json({ message: error.message });
    }

    if (project.members.includes(user._id)) {
        const error = new Error('El usuario ya pertenece proyecto');
        return res.status(403).json({ message: error.message });
    }

    project.members.push(user._id);
    await project.save();
    res.json({ message: 'Usuario agregado' });
};

export const removeMember = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ message: error.message });
    }
    
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }
    
    project.members.pull(req.body.id);
    await project.save();
    return res.json({ message: 'Colaborador eliminado correctamente' });
};