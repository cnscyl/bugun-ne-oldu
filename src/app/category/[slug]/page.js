"use client";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '@/components/Footer';

export default function CategoryNews() {
  const router = useRouter();
  const { slug } = useParams(); // URL'deki kategori adını alır
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`/api/categories/${slug}/news`) // slug'a göre filtrelenmiş API
      .then((res) => setNewsList(res.data.data))
      .catch((err) => {
        console.error('API Hatası:', err);
        setError("Kategoriye ait haberler yüklenemedi.");
      });
  }, [slug]);

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
            {slug.charAt(0).toUpperCase() + slug.slice(1)} Haberleri
          </div>
          <div className="text-[15px] text-[#95989A] font-[Poppins]">
            Bu sayfada sadece {slug} kategorisine ait haberler listelenmektedir.
          </div>
        </div>
        <Footer />
      </div>

      <div className="w-[calc(100%-400px)] bg-white overflow-x-auto h-screen">
        {error ? (
          <div className="p-8 text-red-500 font-[Poppins]">{error}</div>
        ) : (
          <ul className="text-black text-sm flex flex-row items-stretch h-full">
            {newsList.map((news, index) => {
              const items = [];

              items.push(
                <li
                  key={news._id}
                  className="relative border-r border-gray-300 hover:bg-orange-50 px-4 min-w-[280px] max-w-[280px] flex flex-col justify-center items-start"
                >
                  <div className="absolute top-4 font-bold text-4xl opacity-25">{String(index + 1).padStart(2, '0')}</div>
                  <p className="text-xs text-black opacity-50">3 saat önce</p>
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

              if (index == 2) {
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
        )}
      </div>
    </main>
  );
}
