import { getDb } from "../configs/db.config.js";
import Joi from "joi";

const schema = Joi.object({
  nombreAlumno: Joi.string().required(),
  motorCC: Joi.number().min(50).max(500).required(),
  modelo: Joi.number().integer().min(1000).max(9999).required(),
  marca: Joi.string().min(10).required(),
  extras: Joi.string().optional()
});

export const getMotocicletas = async (req, res) => {
  try {
    const db = getDb();
    const motos = await db.collection("motocicletas").find().toArray();
    return res.status(200).json(motos);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener motocicletas" });
  }
};

export const createMotocicleta = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const db = getDb();

    const existente = await db.collection("motocicletas").findOne({ modelo: req.body.modelo });
    if (existente)
      return res.status(409).json({ message: "Motocicleta ya registrada" });

    const result = await db.collection("motocicletas").insertOne(req.body);

    return res.status(201).json({ message: "Motocicleta creada", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear motocicleta" });
  }
};
