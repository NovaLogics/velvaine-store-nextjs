"use client";
import Image from "next/image";
import React, { useState } from "react";

interface GalleryProps {
  productMedia: string[];
}

const Gallery: React.FC<GalleryProps> = ({ productMedia }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
        src={mainImage}
        alt="product"
        width={500}
        height={500}
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-black":""}`}
            src={image}
            height={200}
            width={200}
            alt="product"
            onClick={()=>setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
