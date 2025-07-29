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
  const [today, setToday] = useState("");
  const newestNews = newsList.length > 0 ? newsList[0] : null;

  
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

    useEffect(() => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    setToday(formattedDate);
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
          <div className="mb-4 text-[12px]">
            {newestNews?.summary || 'Bugünün özeti burada yer alacak...'}
          </div>
          <div>
            <button
              onClick={() => router.push('/news')}
              className="bg-white px-4 py-2 font-bold text-red-500"
            >
              GÖRÜNTÜLE
            </button>
          </div>

        </div>
      </div>

      <div>
        <div className="bg-white hidden lg:block lg:w-[400px] p-6 lg:h-screen">
          <div className="relative z-30 h-full w-full overflow-y-auto text-black
                [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]
                [mask-size:100%_100%] [mask-repeat:no-repeat]">
            <div className="relative z-30 h-full w-full overflow-y-auto text-black
                  [mask-image:linear-gradient(to_top,transparent_0%,black_30%)]
                  [mask-size:100%_100%] [mask-repeat:no-repeat]">

              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white z-10 pointer-events-none" />

              <ul className="text-xl flex flex-col gap-4 pl-15 px-10 text-center border-t border-black pt-4 font-[Poppins]">
                {newsList.map((item, index) => (
                  <li key={item._id ?? index} className="border-b border-black pb-4">
                    <div className="font-bold text-5xl h-[25px] overflow-hidden opacity-10">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {item.summary}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-50 bg-white w-10 h-screen p-6 hidden lg:block"></div>
      </div>
    </main >
  );
}