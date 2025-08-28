import express from "express";
import dotenv from "dotenv";
import { connectToMongo } from "./configs/db.config.js";
import motocicletaRoutes from "./routes/motocicletaRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/motocicletas", motocicletaRoutes);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor iniciado en puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
