import express from 'express';
import dotenv from 'dotenv';
import connectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

connectarDB();

// Routing
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})