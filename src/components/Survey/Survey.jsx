//import React from "react";
//import "../Cards/Cards.css";
//import { motion } from "framer-motion";
import { cardsData } from "../../data/data";
import Cards from "../../Pages/Cards";

export default function Survey() {
  return (
    <div>
      <div className="card-container">
        <div className="card-group">
          {cardsData.map((card, i) => (
            <Cards key={i} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
    
  );
}
