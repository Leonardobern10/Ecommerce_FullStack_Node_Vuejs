import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true, min: 1 },
            imageUrl: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pendente', 'Processando', 'Enviado', 'Entregue'],
        default: 'Pendente',
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
