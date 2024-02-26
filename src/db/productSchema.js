import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: false,
        default: 0,
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.models.Product|| mongoose.model('Product', productSchema);

export default Product;