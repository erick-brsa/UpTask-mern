import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

export const createUser = async (req, res) => {
    // Evitar registro de usuarios duplicados
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("El usuario ya existe");
        return res.status(400).json({ message: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const newUser = await user.save()
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
}

export const authenticateUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    // Comprobrar si el usuario existe
    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ message: error.message });
    }
    
    // Comprobar si el usuario está confirmado
    if (!user.confirmed) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ message: error.message });
    }

    // Comprobar si la contraseña es correcta
    if (await user.comparePassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        })
    } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({ message: error.message });
    }
}

export const confirmUser = async (req, res) => {

    const { token } = req.params;
    const userConfirmed = await User.findOne({ token });

    if (!userConfirmed) {
        const error = new Error("Token inválido");
        return res.status(404).json({ message: error.message });
    }

    try {
        userConfirmed.confirmed = true;
        userConfirmed.token = "";
        await userConfirmed.save();
        res.json({ message: "Usuario confirmado" });
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ message: error.message });
    }

    try {
        user.token = generateId();
        await user.save();
        res.json({ message: "Se ha enviado un correo para restablecer la contraseña" });
    } catch (error) {
        console.log(error);
    }
} 

export const checkToken = (req, res) => {

    const { token } = req.params;

    const validToken = User.findOne({ token });

    if (!validToken) {
        const error = new Error("Token inválido");
        return res.status(404).json({ message: error.message });
    }

    res.json({ message: "Token válido y el usuario existe" });
}

export const newPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });

    if (user) {
        try {
            user.password = password;
            user.token = "";
            await user.save();
            res.json({ message: "Contraseña restablecida" });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Token inválido");
        return res.status(404).json({ message: error.message });
    }
}

export const account = (req, res) => {
    const {user} = req;
    res.json(user);
}