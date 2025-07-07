import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/bugun';

if (!MONGODB_URI) {
  throw new Error('Lütfen MONGODB_URI ortam değişkenini tanımlayın.');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB bağlantısı başarılı.');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;