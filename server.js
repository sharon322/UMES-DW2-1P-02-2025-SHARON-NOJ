import express from 'express';
import routes from './routes/motocicletaRoutes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/motocicletas", routes);

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, '0.0.0.0', () => {
      console.log(`Servidor iniciado en puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();