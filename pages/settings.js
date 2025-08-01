import dbConnect from '../../lib/db';
import Settings from '../../models/Settings';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Yalnızca GET istekleri destekleniyor.' });
  }

  try {
    const settings = await Settings.find().select('key value description');
    const formattedSettings = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    res.status(200).json({ success: true, data: formattedSettings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: error.message });
  }
}