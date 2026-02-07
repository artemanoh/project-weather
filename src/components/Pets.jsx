import ghostDog from "../images/ghost-dog.png";
import pictureCat from "../images/woman-with-cat.png";
import pictureDog from "../images/woman-with-dog.png";
import dog from "../images/dog.png";
import "../css/Pets.css";
export const Pets = () => {
  return (
    <section className="pets">
      <div className="container">
        <div className="pets-container">
          <h2 className="pets-title">Interacting with our pets</h2>
          <ul className="pets-list">
            <li className="pets-list-item">
              <img
                className="pets-list-item-image"
                src={ghostDog}
                alt="ghost-dog"
              />
              <p className="pets-list-item-text">
                Rescue pups pose as ghosts in festive photo shoot
              </p>
            </li>
            <li className="pets-list-item">
              <img
                className="pets-list-item-image"
                src={pictureDog}
                alt="ghost-dog"
              />
              <p className="pets-list-item-text">
                Cat interrupts morning coffee on sunny Washington morning
              </p>
            </li>
            <li className="pets-list-item">
              <img
                className="pets-list-item-image"
                src={pictureCat}
                alt="ghost-dog"
              />
              <p className="pets-list-item-text">
                New study finds dogs pay more attention to women
              </p>
            </li>
            <li className="pets-list-item">
              <img className="pets-list-item-image" src={dog} alt="ghost-dog" />
              <p className="pets-list-item-text">
                Petting dogs gives health benefit, even if they are not yours
              </p>
            </li>
          </ul>
          <button className="pets-button">See more</button>
        </div>
      </div>
    </section>
  );
};
