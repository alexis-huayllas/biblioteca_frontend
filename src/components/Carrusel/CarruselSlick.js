import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselSlick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Cambia el tiempo de cambio de imagen aquí (en milisegundos)
  };

  const images = [
    //'/logo192.png',
    //'/logo512.png',
    //'/imagen3.jpg',
    '/slider01.jpg',
    '/slider02.jpg',
    '/slider03.jpg',
    '/slider04.jpg',
    '/slider05.jpg',
    '/slider06.jpg',
    '/slider07.jpg',
    // Agrega aquí más rutas de imágenes locales según tus archivos
  ];

  return (
    <div className="carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              style={{ maxWidth: '99%', width:'99%', height: '500px' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlick;
