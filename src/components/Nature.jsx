import images from "../images/Group-of-images.png";
import "../css/Nature.css";

export const Nature = () => {
  return (
    <section className="nature">
        <div className="container">
            <div className="nature-container">
                <h2 className="nature-title">Beautiful nature</h2>
                <img className="nature-images" src={images} alt="images" />
            </div>
        </div>
    </section>
  );
};
