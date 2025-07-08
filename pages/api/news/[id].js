import dbConnect from '../../../lib/db';
import News from '../../../models/News';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Yalnızca GET istekleri destekleniyor.' });
  }

  try {
    const news = await News.findOne({ slug: id, status: 'published' })
      .populate('category', 'name slug')
      .select('title slug summary content coverImage publishedAt category');

    if (!news) {
      return res.status(404).json({ success: false, message: 'Haber bulunamadı.' });
    }

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: error.message });
  }
}