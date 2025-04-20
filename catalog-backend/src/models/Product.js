import mongoose from 'mongoose';
import { TypeClock } from './Type.js';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(TypeClock) },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
