"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function CategoriesMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const categories = [
    { name: "Anasayfa", slug: "/" },
    { name: "Gündem", slug: "/news" },
    { name: "Ekonomi", slug: "ekonomi" },
    { name: "Spor", slug: "spor" },
    { name: "Magazin", slug: "magazin" },
    { name: "Dünya", slug: "dunya" },
    { name: "Teknoloji", slug: "teknoloji" },
    { name: "Sağlık", slug: "saglik" },
  ];

  const handleCategoryClick = (slug) => {
    setIsOpen(false);
    if (slug === "/") {
      router.push("/");
    } else if (slug === "/news") {
      router.push("/news");
    } else {
      router.push(`/category/${slug}`);
    }
  };

  return (
    <main className="fixed h-screen w-screen flex">
      
      <div
        className={`z-20 w-20 h-screen ${isOpen ? 'bg-[#cf151c]' : 'bg-white'} flex flex-col items-center justify-between border-r border-gray-800 transition-all duration-500 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        
        <div className={`z-40 bg-[#cf151c] w-full ${isOpen ? 'h-screen' : 'h-[200px]'} transition-all duration-500`}>
          <div className="flex justify-center py-4 text-white text-lg font-bold w-20 h-16 p-4">
            <Image src="/images/Group439.png" alt="Görsel" width={100} height={120} onClick={() => router.push('/')} />
          </div>
        </div>

        
        <div className="z-40 absolute top-0 bottom-0 m-auto h-12">
          <div className={`top-0 bottom-0 m-auto h-full flex ${isOpen ? '' : 'gap-2'}`}>
            <div className={`h-full ${isOpen ? 'w-px bg-white -rotate-45' : 'w-0.5 bg-gray-600'} transition-all duration-500`} />
            <div className={`h-full ${isOpen ? 'w-px bg-white rotate-45' : 'w-0.5 bg-gray-600'} transition-all duration-500`} />
          </div>
        </div>

        
        <div className="z-40 p-8">
          <div className={`flex h-4 w-4 rounded-full ${isOpen ? 'bg-white' : 'bg-[#cf151c]'} transition-all duration-500`} />
        </div>
      </div>

      
      <div
        className={`z-10 absolute top-0 bg-[#cf151c] ${isOpen ? 'w-[26%] left-20' : '-left-1/2'} h-screen transition-all duration-500 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-8">
          
          <div className="absolute top-0 bottom-0 m-auto flex items-center">
            <ul className="text-5xl text-white font-bold flex flex-grow flex-col justify-center space-y-4">
              {categories.map((cat) => (
                <li
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="z-40 cursor-pointer transition-colors hover:text-[#980C10]"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          
          <div className="absolute bottom-10">
            <ul className="py-4 flex text-white text-xl gap-3 *:transition-colors">
              <li className="hover:opacity-80">
                <Image src="/images/Group 420.png" alt="Görsel" width={8} height={8} />
              </li>
              <li className="hover:opacity-80">
                <Image src="/images/Path 2319.png" alt="Görsel" width={18} height={18} />
              </li>
              <li className="hover:opacity-80">
                <Image src="/images/Group 428.png" alt="Görsel" width={18} height={18} />
              </li>
            </ul>
            <div className="text-xs text-white">
              Copyright © 2007 - Tüm hakları saklıdır. <br />
              Habertürk Gazetecilik A.Ş
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-full h-full">
        {children}
      </div>
    </main>
  );
}
