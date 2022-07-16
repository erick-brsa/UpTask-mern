import Project from '../models/Project.js';

export const newProyect = async (req, res) => {
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
    });    
    res.json(projects);
};

export const getProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error("El proyecto no existe");
        return res.status(404).json({ message: error.message });
    }

    res.json('getProject');
    // res.json(project);
};

export const updateProject = async (req, res) => {
    console.log('updateProject');
};

export const deleteProject = async (req, res) => {
    console.log('deleteProject');
};

export const addMember = async (req, res) => {
    console.log('addMember');
};

export const removeMember = async (req, res) => {
    console.log('removeMember');
};

export const getTasks = async (req, res) => {
    console.log('getTasks');
};