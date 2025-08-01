import dbConnect from '../../../lib/db';
import News from '../../../models/News';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Yalnızca GET istekleri destekleniyor.' });
  }

  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const news = await News.find({ status: 'published' })
      .populate('category', 'name slug')
      .skip(skip)
      .limit(Number(limit))
      .select('title slug summary coverImage content createdAt publishedAt category');

    const total = await News.countDocuments({ status: 'published' });

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: error.message });
  }
}