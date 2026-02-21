import "../css/Pets.css";
import { useEffect, useState } from "react";
export const Pets = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const PIXABAY_KEY = "50834834-38d93ed52f356f352f281d28a";
  const URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=animals&image_type=photo&per_page=10`;
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setArticles(data.hits))
      .catch((err) => console.log(err));
  }, []);

  const currentArticles = articles.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (!articles.length) return <p>Loading news...</p>;
  return (
    <section className="pets">
      <div className="container">
        <div className="pets-container">
          <h2 className="pets-title">Interacting with our pets</h2>
          <ul className="pets-list">
            {currentArticles.map((article, index) => (
              <li className="pets-list-item" key={index}>
                <img
                  className="pets-list-item-image"
                  src={article.webformatURL}
                  alt={article.tags}
                />
                <p className="pets-list-item-text">
                  Photo of {article.tags.split(",")[0]} by {article.user}
                </p>
              </li>
            ))}
          </ul>
          {visibleCount < articles.length && (
            <button className="pets-button" onClick={loadMore}>
              See more
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
