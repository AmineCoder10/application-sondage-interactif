import React from "react";
import "./Cards.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cards({ id, titleSurvey, description }) {
  return (
    <div>
      <div className="card" id="cards">
        <div>
          <h3 className="text">{titleSurvey}</h3>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="icons">
          <Link to={`/surveyForm/${id}`}>
            <motion.button
              className="custom-button"
              whileHover={{ scale: 1.08 }}
            >
              Preview
            </motion.button>
          </Link>
          <Link to={`/SurveyReport/${id}`}>
            <motion.button className="reports-btn" whileHover={{ scale: 1.08 }}>
              Reports
            </motion.button>
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
}
