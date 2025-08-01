import dbConnect from '../../../../lib/db';
import News from '../../../../models/News';
import Category from '../../../../models/Category';

export default async function handler(req, res) {
  const { method, query: { slug } } = req;

  await dbConnect();

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Yalnızca GET istekleri destekleniyor.' });
  }

  try {
    const category = await Category.findOne({ slug, status: 'active' });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Kategori bulunamadı.' });
    }

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const news = await News.find({ category: category._id, status: 'published' })
      .populate('category', 'name slug')
      .skip(skip)
      .limit(Number(limit))
      .select('title slug summary coverImage publishedAt category');

    const total = await News.countDocuments({ category: category._id, status: 'published' });

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