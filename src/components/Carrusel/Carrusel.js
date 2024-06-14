import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    '/logo192.png',
    '/logo512.png',
    //'/imagen3.jpg',
    // Agrega aquí más rutas de imágenes locales según tus archivos
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // Cambia el tiempo de cambio de imagen aquí (en milisegundos)

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevImage}>{'<'}</button>
      <img
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <button onClick={nextImage}>{'>'}</button>
    </div>
  );
};

export default Carousel;
