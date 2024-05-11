import React from "react";
import '../../Pages/Cards.css';
//import { motion } from "framer-motion";
import { cardsData } from "../../data/data";
import Cards from "../../Pages/Cards";

export default function Survey() {
  return (
      <div className="card-container" style={{marginLeft:"100px"}}>
        <div className="card-group">
          {cardsData.map((card, i) => (
            <Cards key={i} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
  );
}