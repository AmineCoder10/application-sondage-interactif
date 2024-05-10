import { Link } from "react-router-dom";
import Cards from "./Cards";
import React, { useState } from "react";
import { cardsData } from "../data/data";


export default function CardGallery() {



  const [showAll, setShowAll] = useState(false);

  const displayedCards = showAll ? cardsData : cardsData.slice(0, 3);

  return (
    <>
      <div className="card-container">
        <div className="card-group">
          {displayedCards.map((card, i) => (
            <Cards key={i} title={card.title} description={card.description} />
          ))}
        </div>

      </div>
      <Link to="/survey">
      {
        !showAll && (
          <button className="cubutton" onClick={() => setShowAll(true)}> others</button>
        )
      }
      </Link>



    </>

  );
}