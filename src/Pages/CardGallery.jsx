import Cards from "./Cards";
import React, { useState } from "react";



export default function CardGallery() {

  const cardsData = [
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {

      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {

      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    },
    {
      title: 'Noteworthy technology acquisitions 2021',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
    }

  ];

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
      {
        !showAll && (
          <button className="cubutton" onClick={() => setShowAll(true)}>Show More</button>
        )
      }

      <a href="/survey">

        <button className="cubutton" >Other Survies</button>
      </a>


    </>

  );
}