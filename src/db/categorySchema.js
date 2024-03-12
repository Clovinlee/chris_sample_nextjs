import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});

const Category = mongoose.models.Category|| mongoose.model('Category', categorySchema);

export default Category;