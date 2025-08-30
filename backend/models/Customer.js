import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true }, // Sparse allows multiple nulls
  loyaltyPoints: { type: Number, default: 0 },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;