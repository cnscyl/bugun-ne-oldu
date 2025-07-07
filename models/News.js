import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Başlık zorunludur.'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug zorunludur.'],
      unique: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Özet zorunludur.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'İçerik zorunludur.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Kategori zorunludur.'],
    },

    coverImage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model('News', NewsSchema);