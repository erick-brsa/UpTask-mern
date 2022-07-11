import express from 'express';
import dotenv from 'dotenv';
import connectarDB from './config/db.js';

const app = express();

dotenv.config();

connectarDB();

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})