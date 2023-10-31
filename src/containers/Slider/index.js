import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc) { // condition pour éviter les erreurs si les data ne sont pas encore fetch au moment du rendu
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0); // Ajout de -1 sur byDateDesc.length pour que la condition s'applique lorsqu'on est sur la dernière image du slider
    }
  };
  useEffect(() => {
    const time = setTimeout(() => { // déplacement de setTimeout dans useEffect pour remettre le compteur à 0 à chaque changement du slider
      nextCard();
    }, 5000); 
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))} {/* extration des boutons radio en dehors du mapping de SlideCardList pour éviter les doublons inutiles */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title} // modification de la prop key pour éviter d'utiliser plusieurs fois la même key
              type="radio"
              name="radio-button"
              checked={radioIdx === index} // l'index "radioIdx" du bouton checked correspond au state index
              onChange={() => setIndex(radioIdx)} // onChange permet de modifier manuellement le bouton coché et vient set le state index pour qu'il corresponde à l'index du bouton "radioIdx"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
