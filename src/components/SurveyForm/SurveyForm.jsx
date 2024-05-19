import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, } from 'reactstrap';
import { motion } from 'framer-motion';
import './SurveyForm.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import SurveyLogo from '../../assets/images/surveyLogo.png';

export default function SurveyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  //-----------------------------------------

  

  //---------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Surveys/${id}`); // Use axios.get
        setSurveyData(response.data);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age === "" || gender === "") {
      toast.warning("Personal info required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/Answers", {
        surveyId: id,
        responses: answers,
        age,
        gender,
      });
      toast.success("Your responses have been submitted successfully!");
      navigate("/survey");
    } catch (error) {
      console.error("Error:", error);
      toast.warning(
        "There was an error submitting your responses. Please try again."
      );
    }
  };

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  // Check if all questions have been answered
  const allQuestionsAnswered = surveyData.questions.every((_, index) =>
    answers.hasOwnProperty(index)
  );

  return (
    <>
      <Container
        style={{
          position: "relative",
          border: "solid black",
          padding: "58px",
          marginTop: "60px",
          marginBottom: "70px",
          borderRadius: "20px",
        }}
      >
        <div className="part1">
          <p className="Form-desc">{surveyData.title}</p>
          <img src={SurveyLogo} alt="survey Logo" />
        </div>
        <Row>
          <Col lg="8">
            <form onSubmit={handleSubmit}>
              {surveyData.questions.map((question, index) => (
                <div key={index} className="demo">
                  <div>
                    <p
                      className="title-underline"
                      style={{
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "20px",
                      }}
                    >
                      {question.question}
                    </p>
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} style={{ marginLeft: "15px" }}>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={option.text}
                        onChange={() => handleOptionChange(index, option.text)}
                        style={{ marginBottom: "15px" }}
                      />
                      <span style={{ marginLeft: "5px" }}>{option.text}</span>
                    </label>
                  ))}
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="collect-btn"
                type="submit"
                disabled={!allQuestionsAnswered}
                style={{
                  position: "absolute",
                  bottom: "2%",
                  right: "-1.8%",
                  marginRight: "80px",
                  marginTop: "20px",
                  paddingRight: "20px",
                  paddingTop: "8px",
                  paddingLeft: "20px",
                  paddingBottom: "8px",
                }}
              >
                Submit
              </motion.button>
            </form>
          </Col>
          <Col lg="4">
            <div
              className="selection"
              style={{
                backgroundColor: "#d6e5fb",
                height: "40vh",
                borderRadius: "15px",
                marginBottom: "50px",
              }}
            >
              <p>Personal information required before submission :</p>

              <h3 className="form-title">Select Your age</h3>
              <div className="age-section">
                {["-18", "18-25", "25-35", "35-45", "45+"].map((ageRange) => (
                  <div key={ageRange}>
                    <input
                      type="radio"
                      name="age"
                      value={ageRange}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <label>{ageRange}</label>
                  </div>
                ))}
              </div>
              <h3 className="form-title">Select Your gender</h3>
              <div className="gender-section">
                {["Male", "Female"].map((genderOption) => (
                  <div key={genderOption}>
                    <input
                      type="radio"
                      name="gender"
                      value={genderOption}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    <label>{genderOption}</label>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
