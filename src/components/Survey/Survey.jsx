import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../Pages/Cards";
import BackButton from "../UI/BackButton";
import HelmetComponent from "../CustomHook/HelmeComponentt";

export default function Survey() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const response = await axios.get("http://localhost:3001/Surveys");
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    }

    fetchSurveys();
  }, []);

  return (
    <>
      <HelmetComponent title="Survey List" />
      <div
        className="card-container"
        style={{ padding: "3.5%", marginBottom: "50px", marginTop: "-5px" }}
      >
        <div className="card-group">
          {surveys.map((survey) => (
            <Cards
              key={survey.id}
              id={survey.id}
              titleSurvey={survey.title}
              description={survey.description}
              survey={survey}
            />
          ))}
        </div>
        <BackButton
          style={{
            position: "absolute",
            top: "1.8%",
            left: "10.5%",
            marginRight: "80px",
            marginTop: "20px",
            paddingRight: "30px",
            paddingTop: "8px",
            paddingLeft: "30px",
            paddingBottom: "8px",
          }}
        />
      </div>
    </>
  );
}
