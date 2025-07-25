"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/news')
      .then((res) => {
        setNewsList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Hatası:', err);
        setError('Haberler yüklenirken bir hata oluştu');
        setLoading(false);
      });
  }, []);



  // Hata durumu
  if (error) {
    return (
      <main className="flex min-h-screen bg-white justify-center items-center">
        <div className="text-black text-xl">{error}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-wrap">
      <div className="flex w-[calc(100%-400px)] items-center bg-[#CF161C] p-30">
        <div className="text-white">
          <div className="text-xl font-bold">26.07.2025</div>
          <div className="mb-4 text-9xl font-bold">
            Bugün <br />
            ne oldu?
          </div>
          <div className="mb-4 text-[9px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text...
          </div>
          <div>
            <button
              onClick={() => router.push('/news')}
              className="bg-white px-4 py-2 font-bold text-red-500"
            >
              GÖRÜNTÜLE
            </button>
          </div>
         <Footer className="bg-[#CF161C] text-white mt-8" />
        </div>
      </div>

      <div className="relative w-[400px] bg-white p-12 overflow-y-auto h-screen">
       <div className="absolute top-0 left-0 z-10 w-full h-[400px] bg-gradient-to-b from-white from-10% to-white/20"></div>
        <ul className="text-black text-sm flex flex-col gap-4 text-center *:border-b *:border-black *:pb-4">
          {newsList.map((news, index) => (
            <li key={news._id}>
              <div className="text-shadow-lg font-bold text-4xl h-[25px] overflow-hidden opacity-10">
                {String(index + 1).padStart(2, '0')}
              </div>
              {news.summary || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 left-0 z-10 w-full h-[400px] bg-gradient-to-t from-white from-10% to-white/50"></div>
      </div>
    </main>
  );
}