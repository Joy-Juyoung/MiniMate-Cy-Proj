import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isAutoPlay) {
      intervalId = setInterval(nextImage, 2000); // 3초마다 이미지 변경
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlay]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prevState) => !prevState);
  };

  return (
    <div className='image-slider py-14'>
      {/* <button onClick={previousImage}>Previous</button> */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`w-full object-cover rounded-lg
            ${index === currentImageIndex ? 'active' : 'hidden'}
            ${
              index === currentImageIndex - 1 ||
              (currentImageIndex === 0 && index === images.length - 1)
                ? 'previous'
                : ''
            }
          `}
        />
      ))}
      {/* <button onClick={nextImage}>Next</button> */}
      {/* <button onClick={toggleAutoPlay}>{isAutoPlay ? 'Pause' : 'Play'}</button> */}
    </div>
  );
};

export default ImageSlider;
