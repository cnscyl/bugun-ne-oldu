"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Sabit haber görselleri (API'den gelen coverImage öncelikli olacak)
const newsImages = {
};


export default function NewsDetail() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const newsId = params.newsId; // URL'den newsId parametresini al

  // API'den haberleri çek
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/news')
      .then((res) => {
        const newsData = res.data.data;
        setNewsList(newsData);
        // URL'deki newsId ile eşleşen haberi seç
        const selectedNews = newsData.find((news) => news._id === newsId);
        if (selectedNews) {
          setSelectedItem(selectedNews._id);
        } else {
          setError('Haber bulunamadı');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Hatası:', err);
        setError('Haberler yüklenirken bir hata oluştu');
        setLoading(false);
      });
  }, [newsId]);

  // Yükleme veya hata durumu
  if (loading) {
    return (
      <main className="flex min-h-screen bg-white justify-center items-center">
        <div className="text-black text-xl">Yükleniyor...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen bg-white justify-center items-center">
        <div className="text-black text-xl">{error}</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-white md:flex-row m-0 p-0">
      {/* Left Section (News List) */}
      <div className="w-[480px] bg-white border-b md:border-r border-gray-300 md:border-b-0 overflow-x-auto md:overflow-y-auto md:h-screen">
        <ul className="flex flex-row text-black text-sm w-full whitespace-nowrap md:flex-col">
          {newsList.map((item, index) => (
            <li
              key={item._id}
              className={`relative border-b border-gray-300 p-6 hover:bg-yellow-50 flex flex-row items-start transition duration-300 ${
                selectedItem === item._id ? 'bg-yellow-50' : ''
              }`}
              onClick={() => setSelectedItem(item._id)}
            >
              <div className="absolute top-6 left-6 font-bold text-2xl pt-0 md:text-5xl opacity-25">
                {String(index + 1).padStart(2, '0')} 
              </div>
              <Image
                className="mr-7 pt-9"
                src={newsImages[item._id] || item.coverImage || '/assets/default.png'}
                alt={`Haber ${item._id}`}
                width={160}
                height={48}
              />
              <div className="flex-1 flex flex-col">
                <p className="text-sm font-bold" style={{ color: '#000000' }}>
                  <br />
                  {item.title || 'Lorem ipsum dolor sit amet...'}
                </p>
                <br />
                <p className="text-xs" style={{ color: '#000000' }}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR'): 'Tarih yok'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section (Details) */}
      <div className="flex-1 bg-yellow-50 p-4 md:p-8 border-t-0 md:border-l-0 md:border-t-0 h-full md:h-screen overflow-y-auto">
        <div className="text-black">
          {selectedItem ? (
            <div className="flex flex-col">
              {(() => {
                const selectedNews = newsList.find((news) => news._id === selectedItem);
                return selectedNews ? (
                  <>
                    <h1 className="mb-4 text-xl md:text-2xl font-bold">
                      {selectedNews.title || `Haber ${selectedItem}`}
                    </h1>
                    <div className="flex flex-col justify-end pt-8 pb-2">
                      <Image
                        src={newsImages[selectedItem] || selectedNews.coverImage || '/assets/default.png'}
                        alt={`Haber ${selectedItem}`}
                        width={600}
                        height={400}
                        className="w-full max-w-2xl mx-auto object-cover"
                      />
                    </div>
                    <div className="mt-4 text-sm md:text-base">
                      {selectedNews.content ? (
                        selectedNews.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        loremIpsum.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mb-4 text-xl md:text-2xl font-bold">
                    Haber bulunamadı
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="mb-4 text-xl md:text-2xl font-bold">
              Bir haber seçin
            </div>
          )}
        </div>
      </div>
    </main>
  );
}