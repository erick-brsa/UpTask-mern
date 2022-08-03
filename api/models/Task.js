import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    status: {
        type: Boolean,
        default: false
    },
    dateDelivery: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: ["Baja", "Media", "Alta"],
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }
}, { 
    timestamps: true 
});

const Task = mongoose.model("Task", taskSchema);

export default Task;