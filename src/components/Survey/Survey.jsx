import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../Pages/Cards";
import BackButton from "../UI/BackButton";

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
    <div
      className="card-container"
      style={{ marginLeft: "5%", marginBottom: "50px", marginTop: "50px" }}
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
      <BackButton style={{ position: "absolute", top: "-5%", left: "6%", marginRight: "80px", marginTop: "20px", paddingRight: "30px", paddingTop: "8px", paddingLeft: "30px", paddingBottom: "8px" }} />

    </div>
  );
}
