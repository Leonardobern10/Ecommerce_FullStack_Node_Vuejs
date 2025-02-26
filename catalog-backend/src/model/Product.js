import mongoose from 'mongoose';

// Criação de uma collection para armazenar documentos
// do tipo produto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
});

// exportação da constante com o nome [Product] se portando como uma entidade
export default mongoose.model('Product', productSchema);
