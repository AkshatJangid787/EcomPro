// Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from "../assets/1.jpg";
import Slider2 from "../assets/2.jpg";
import Slider3 from "../assets/3.jpg";

// You can add more images as needed
const carouselImages = [
  { src: Slider3, alt: "Image 1", caption: "Welcome to Our Store!" },
  { src: Slider2, alt: "Image 2", caption: "Quality Products at Great Prices!" },
  { src: Slider1, alt: "Image 3", caption: "Shop the Latest Trends!" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[90%] mx-auto mt-10">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-4">
              <h3 className="text-lg font-bold">{image.caption}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
