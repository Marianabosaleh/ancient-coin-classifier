import React from "react";
import "./style.css";

// Function to generate random sizes for images
const getRandomSize = () => {
  const sizes = [
    // { width: 100, height: 100 },
    // { width: 120, height: 120 },
    // { width: 150, height: 150 },
    // { width: 180, height: 180 },
    { width: 180, height: 180 },
  ];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const itemData = [
  { img: "/images/coin1.jpg", title: "Coin 1" },
  { img: "/images/coin2.jpg", title: "Coin 2" },
  { img: "/images/coin3.jpg", title: "Coin 3" },
  { img: "/images/coin4.jpg", title: "Coin 4" },
  { img: "/images/coin5.jpg", title: "Coin 5" },
  { img: "/images/coin6.jpg", title: "Coin 6" },
  { img: "/images/coin7.jpg", title: "Coin 7" },
  { img: "/images/coin8.jpg", title: "Coin 8" },
  { img: "/images/coin9.jpg", title: "Coin 9" },
  { img: "/images/coin10.jpg", title: "Coin 10" },
];

export const ImageGallery: React.FC = () => {
  return (
    <div className="scrolling-gallery">
      <div className="gallery-track">
        {/* Original images with random sizes */}
        {itemData.map((item, index) => {
          const { width, height } = getRandomSize();
          return (
            <img
              key={index}
              src={item.img}
              alt={item.title}
              className="gallery-img"
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          );
        })}
        {/* Duplicate images for smooth infinite scroll */}
        {itemData.map((item, index) => {
          const { width, height } = getRandomSize();
          return (
            <img
              key={`duplicate-${index}`}
              src={item.img}
              alt={item.title}
              className="gallery-img"
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
};
