import mongoose from 'mongoose';

const motocicletaSchema = new mongoose.Schema({
    nombreAlumno: { type: String, required: true },
    motorCC: { type: Number, required: true, min: 50, max: 500 },
    modelo: { type: Number, required: true, min: 1000, max: 9999 },
    marca: { type: String, required: true, minlength: 10 },
    extras: { type: String }
});

export default mongoose.model('Motocicleta', motocicletaSchema);