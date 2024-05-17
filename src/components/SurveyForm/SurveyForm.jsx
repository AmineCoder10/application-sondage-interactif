import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';
import './SurveyForm.css';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios

export default function SurveyForm() {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Surveys/${id}`); // Use axios.get
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: selectedOption
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/Answers', {surveyId: id, responses: answers}); // Use axios.post
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      toast.success('Your responses have been submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.warning('There was an error submitting your responses. Please try again.');
    }
  };

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  // Check if all questions have been answered
  const allQuestionsAnswered = surveyData.questions.every((_, index) => answers.hasOwnProperty(index));

  return (
    <>
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
                    value={option.text}
                    onChange={() => handleOptionChange(index, option.text)}
                    style={{marginBottom:"15px"}}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.08 }} className='collect-btn' type="submit" disabled={!allQuestionsAnswered} style={{ position: "absolute", top: "0", right: "-1.8%", marginRight: "80px", marginTop: "20px", padding: "6px" }}><Link to={"/survey"}>Submit</Link></motion.button>
        </form>
      </Container>
    </>
  );
}
