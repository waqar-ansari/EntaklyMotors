import Image from "next/image";
import Link from "next/link";
import React from "react";

const FloatingWhatsapp = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        zIndex: 1000,
        padding: 10,
        background: "transparent",
        borderRadius: 50,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Link href="https://wa.me/+971044536000" target="_blank">
        <Image
          src="/icons/whatsappLogo.png"
          alt="logo"
          width={50}
          height={50}
        />
      </Link>
    </div>
  );
};

export default FloatingWhatsapp;
