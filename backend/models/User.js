import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Admin', 'Staff', 'Customer'],
    default: 'Customer',
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store', // For multi-store support
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;