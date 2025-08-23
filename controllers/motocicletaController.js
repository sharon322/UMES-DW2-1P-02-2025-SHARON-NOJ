import Motocicleta from '../models/motocicleta.js';
import Joi from 'joi';

const motocicletaSchema = Joi.object({
    nombreAlumno: Joi.string().required(),
    motorCC: Joi.number().min(50).max(500).required(),
    modelo: Joi.number().integer().min(1000).max(9999).required(),
    marca: Joi.string().min(10).required(),
    extras: Joi.string().allow('')
});

export const getMotocicletas = async (req, res) => {
    try {
        const motos = await Motocicleta.find();
        res.status(200).json(motos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' }); 
    }
};

export const createMotocicleta = async (req, res) => {
    try {
        const { error } = motocicletaSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message }); // 400 Bad Request

        const existing = await Motocicleta.findOne({ modelo: req.body.modelo });
        if (existing) return res.status(409).json({ message: 'La motocicleta ya existe' }); // 409 Conflict

        const nuevaMoto = new Motocicleta(req.body);
        await nuevaMoto.save();

        res.status(201).json(nuevaMoto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};