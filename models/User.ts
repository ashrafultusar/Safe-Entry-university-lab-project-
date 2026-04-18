import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
  twoFactorOTP: { type: String },
  twoFactorOTPExpires: { type: Date },
 
knownDevices: [
  {
    userAgent: String,
    lastLogin: { type: Date, default: Date.now }
  }
],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);