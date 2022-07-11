import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;