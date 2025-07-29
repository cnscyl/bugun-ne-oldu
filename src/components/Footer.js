"use client";

export default function Footer({ className = "" }) {
  return (
    <div className={`text-xs text-[#95989A] absolute bottom-4 font-[Poppins] ${className}`}>
      <p>
        Copyright © 2017 – Tüm hakları saklıdır. <br />
        Habertürk Gazetecilik A.Ş.
      </p>
    </div>
  );
}