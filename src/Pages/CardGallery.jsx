import { Link } from "react-router-dom";
import Cards from "./Cards";
import { useState } from "react";
import { cardsData } from "../data/data";
import { motion } from "framer-motion";


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
          <Link to="/survey">
            {
              !showAll && (
                <motion.button className="cubutton" onClick={() => setShowAll(true)} whileHover={{ scale: 1.05 }}> Others <i class="ri-arrow-right-line" style={{marginLeft:"5px"}}></i></motion.button>
              )
            }
          </Link>
        </div>


      </div>




    </>

  );
}