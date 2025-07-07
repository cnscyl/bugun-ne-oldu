import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, 'Anahtar zorunludur.'],
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Değer zorunludur.'],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

