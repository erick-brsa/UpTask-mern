import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import connectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

// Configurar cors
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            // Puede consultar la api
            callback(null, true);
        } else {
            // No está permitido
            callback(new Error('Error de Cors'));
        }
    }
}

app.use(cors(corsOptions));

connectarDB();

// Routing
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket.io

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    },
});

io.on('connection', (socket) => {
    console.log('Conectado a socket.io');

    // Definir los eventos del socket.io
    socket.on('openProject', (project) => {
        socket.join(project);
    });
    
    socket.on('newTask', (task) => {
        const project = task.project;
        socket.to(project).emit('addedTask', task);
    });

    socket.on('deleteTask', task => {
        const project = task.project;
        socket.to(project).emit('deletedTask', task);
    })

    socket.on('editTask', task => {
        const project = task.project._id;
        socket.to(project).emit('editedTask', task);
    });

    socket.on('completeTask', task => {
        const project = task.project._id;
        socket.to(project).emit("completedTask", task);
    })
});
