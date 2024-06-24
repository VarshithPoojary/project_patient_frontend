import React, { useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

const CustomCarousel = ({ children }) => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const startAutoPlay = () => {
            if (carouselRef.current) {
                carouselRef.current.increment();
            }
        };

        const interval = setInterval(startAutoPlay, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleArrowClick = () => {
        if (carouselRef.current) {
            clearInterval(carouselRef.current.intervalId);
            carouselRef.current.intervalId = setInterval(() => {
                carouselRef.current.increment();
            }, 2000);
        }
    };

    return (
        <Carousel
            ref={carouselRef}
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            stopOnHover={false}
            onClickItem={handleArrowClick}
            onClickThumb={handleArrowClick}
            onChange={handleArrowClick}
        >
            {children}
        </Carousel>
    );
};

export default CustomCarousel;
