import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

productSchema.methods.findSimilarBrands = function (cb) {
    return mongoose.model('Product').find({ brand: this.brand }, cb);
};
export default mongoose.model('Product', productSchema);
