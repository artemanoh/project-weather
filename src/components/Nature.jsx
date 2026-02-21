import { useState, useEffect } from "react";
import "../css/Nature.css";

export const Nature = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const PIXABAY_KEY = "50834834-38d93ed52f356f352f281d28a";
  const URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=nature&image_type=photo&per_page=10`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setImages(data.hits.map((hit) => hit.webformatURL)))
      .catch((err) => console.log(err));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return <p>Loading...</p>;

  return (
    <section className="nature">
      <div className="container">
        <h2 className="nature-title">Beautiful nature</h2>
        <div className="nature-slider"> 
          <button className="nature-slider-button nature-prev" onClick={prevSlide}>&#10094;</button>
          {images.map((img, i) => {
            let className = "nature-images nature-hidden";
            const prev2 = (currentIndex - 2 + images.length) % images.length;
            const prev1 = (currentIndex - 1 + images.length) % images.length;
            const next1 = (currentIndex + 1) % images.length;
            const next2 = (currentIndex + 2) % images.length;
            if (i === currentIndex) className = "nature-images nature-active";
            else if (i === prev1) className = "nature-images nature-prev1";
            else if (i === prev2) className = "nature-images nature-prev2";
            else if (i === next1) className = "nature-images nature-next1";
            else if (i === next2) className = "nature-images nature-next2";
            return (
              <img
                key={i}
                src={img}
                alt={`slide-${i}`}
                className={className}
              ></img>
            );
          })}
          <button className="nature-slider-button nature-next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};
