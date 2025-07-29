"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '@/components/Footer';

export default function News() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [today, setToday] = useState("");
  const newestNews = newsList.length > 0 ? newsList[0] : null;

  useEffect(() => {
    axios
      .get('/api/news')
      .then((res) => setNewsList(res.data.data))
      .catch((err) => console.error('API Hatası:', err));
  }, []);



useEffect(() => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  setToday(formattedDate);
}, []);


  return (
<main className="flex min-h-screen flex-row relative">
  <div className="flex w-[400px] items-center bg-[#FFF] p-8 border-r">
    <div className="text-black">
      <div className="text-2xl font-[Poppins] opacity-50">{today}</div>
      <div className="mb-4 text-4xl font-bold font-[AbrilFatface]">
        Bugün ne oldu?
      </div>
      <div className="text-[15px] text-[#95989A] font-[Poppins]">
        {newestNews?.summary || 'Bugünün özeti burada yer alacak...'}
      </div>
    </div>
    <Footer />
  </div>

      
      <div className="w-[calc(100%-480px)] bg-white overflow-x-auto h-screen">
        <ul className="text-black text-sm flex flex-row items-stretch h-full">
          {newsList.map((news, index) => {
            const items = [];
            
            items.push(
              <li
                key={news._id}
                className="relative border-r border-gray-300 hover:bg-orange-50 px-4 min-w-[280px] max-w-[280px] flex flex-col justify-center items-start"
              >
                <div className="absolute top-4 font-bold text-4xl opacity-25">{String(index + 1).padStart(2, '0')}</div>
                <p className="text-xs text-black opacity-50">{new Date(news.createdAt).toLocaleDateString('tr-TR')}</p>
                <p className="mt-2 mb-2 font-bold">{news.title}</p>
        
                <Image
                  className="pb-4"
                  src={news.coverImage}
                  alt="Görsel"
                  width={260}
                  height={150}
                />
                <p className="text-sm mb-2 text-[#95989A]">{news.summary}</p>
                <button
                  onClick={() => router.push(`/news/${news._id}`)}
                  className="px-4 py-2 font-bold text-black border border-[#DEDEDE]"
                >
                  DETAY
                </button>
              </li>
            );

            if (index==2) {
              items.push(
                <li
                  key={`reklam-${index}`}
                  className="hidden md:flex relative border-r border-gray-300 px-4 min-w-[280px] max-w-[280px] flex flex-col justify-center items-center"
                >
                  <div className="absolute top-4 left-4 font-bold text-4xl opacity-25">REKLAM</div>
                  <Image
                    className="pb-4"
                    src="/images/reklam.png"
                    alt="Reklam"
                    width={260}
                    height={150}
                  />
                </li>
              );
            }
            return items;
          })}
        </ul>
      </div>
    </main>
  );
}
