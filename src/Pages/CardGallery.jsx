/**
 * React component for displaying a gallery of survey cards.
 * 
 * Fetch survey data from a JSON Server API endpoint .
 * mounting using the useEffect hook. It then renders a subset of the fetched.
 * survey data as cards using the Cards component. 
 * Users can click on a button to view all surveys.
 * Framer Motion is used to animate the button on hover.
 * 
 */


import { Link } from "react-router-dom";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";

export default function CardGallery() {
  const [surveys, setSurveys] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const response = await axios.get('http://localhost:3001/Surveys');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    }

    fetchSurveys();
  }, []);

  const displayedSurveys = showAll ? surveys : surveys.slice(-3);

  return (
    <>
      <div className="card-container">
        <div className="card-group">
          {displayedSurveys.map((survey) => (
            <Cards
              key={survey.id}
              id={survey.id}
              titleSurvey={survey.title}
              description={survey.description}
            />
          ))}
          <Link to="/survey">
            {
              !showAll && (
                <motion.button className="cubutton" onClick={() => setShowAll(true)} whileHover={{ scale: 1.05 }}> All Surveys <i className="ri-arrow-right-line" style={{ marginLeft: "5px" }}></i></motion.button>
              )
            }
          </Link>
        </div>
      </div>
    </>
  );
}
