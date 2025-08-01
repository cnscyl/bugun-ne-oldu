import dbConnect from '../../../lib/db';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Yalnızca GET istekleri destekleniyor.' });
  }

  try {
    const categories = await Category.find({ status: 'active' })
      .select('name slug description order')
      .sort('order');

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: error.message });
  }
}