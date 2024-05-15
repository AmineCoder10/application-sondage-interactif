import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';
import './SurveyForm.css';

export default function SurveyForm() {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Surveys/${id}`);
        const data = await response.json();
        setSurveyData(data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (<>
    <p className='Form-desc'>{surveyData.description}</p>
    <Container style={{ position: "relative", border: "solid black", padding: "58px", marginTop: "60px", marginBottom: "70px", borderRadius: "20px" }}>
      <h2>{surveyData.title}</h2>
      <form onSubmit={handleSubmit}>
        {surveyData.questions.map((question, index) => (
          <div key={index} className='demo'>
            <p style={{color:"#0a1d37"}}>{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={optionIndex}
                  style={{marginBottom:"15px"}}
                />
                {option.text}
              </label>
            ))}
          </div>
        ))}
        <motion.button whileHover={{ scale: 1.08 }} className='collect-btn' type="submit" style={{ position: "absolute", top: "0", right: "-1.8%", marginRight: "80px", marginTop: "20px", padding: "6px" }}>Submit</motion.button>
      </form>
    </Container>
  </>
  );
}
