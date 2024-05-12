/**
 * React component for displaying surveys.
 * 
 * Fetch survey data from a JSON Server API endpoint.
 * Use the useEffect hook. It then renders the fetched survey
 * data using the Cards component, which represents each survey as a card.
 * 
 */


import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cards from "../../Pages/Cards";

export default function Survey() {
  const [surveys, setSurveys] = useState([]);

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

  return (
    <div className="card-container" style={{marginLeft:"5%",marginBottom:"50px", marginTop:"30px"}}>
      <div className="card-group">
        {surveys.map((survey) => (
          <Cards
          key={survey.id}
          titleSurvey={survey.title}
          description={survey.description}
        />
        ))}
      </div>
    </div>
  );
}
