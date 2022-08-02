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
        creator: req.user._id
    }).select("-tasks");
    res.json(projects);
};

export const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id).populate('tasks');
    
    if (!project) {
        const error = new Error('No encontrado');
        return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No estás autorizado');
        return res.status(401).json({ message: error.message });
    }

    // Obtener tareas del proyecto
    // const tasks = await Task.find().where('project').equals(project._id);

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
}   

// TODO: Add member to project
export const addMember = async (req, res) => {
    console.log('addMember');
};

// TODO: Remove member from project
export const removeMember = async (req, res) => {
    console.log('removeMember');
};