import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    roles: {
        type: [String],
        default: [] // Default value if roles are not provided
    },
    password: {
        type: String,
        required: false
    },
});

const User = mongoose.models.User|| mongoose.model('User', userSchema);

export default User;