import React, { useState } from 'react';
import { Container, Button, FormGroup, Row, Col } from 'reactstrap';
import './CreateSurvey.css';
import { motion } from 'framer-motion';


export default function CreateSurvey({ addSurvey }) {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: [{ text: '' }, { text: '' }] }]);

    const handleSurveyTitleChange = (event) => {
        setSurveyTitle(event.target.value);
    };

    const handleQuestionChange = (index, event) => {
        const { value } = event.target;
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const removeQuestion = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions.splice(questionIndex, 1);
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const { value } = event.target;
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].text = value;
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[questionIndex].options.length < 4) {
            newQuestions[questionIndex].options.push({ text: '' });
            setQuestions(newQuestions);
        } else {
            alert("You can't add more than 4 options!");
        }
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };


    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [{ text: '' }, { text: '' }] }]);
    };

    const handleCreateSurvey = () => {
        addSurvey({ title: surveyTitle, questions });
        console.log('bla bla' + { title: surveyTitle, questions });
        setSurveyTitle('');
        setQuestions([{ question: '', options: [{ text: '' }, { text: '' }] }]);
    };

    return (
        <Container style={{ position: "relative", border: "solid black", padding: "58px", marginTop: "100px", borderRadius: "20px" }}>
            <div className='form'>
                <h1 className="mb-4 survey-title">Create Survey</h1>
                <Row>
                    <Col lg="5">
                        <div className="formField">
                            <input
                                type="text"
                                required
                                value={surveyTitle}
                                onChange={handleSurveyTitleChange}
                            />
                            <span>Survey Title</span>
                        </div>
                    </Col>
                </Row>

                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mt-4 test">
                        <Row>
                            <Col lg="5">
                                <div className="formField">
                                    <input
                                        type="text"
                                        required
                                        value={question.question}
                                        onChange={(e) => handleQuestionChange(questionIndex, e)}
                                    />
                                    <span>Question {questionIndex + 1}</span>
                                    {questionIndex > 0 &&
                                        <i className="ri-delete-bin-line question-delete-icon" onClick={() => removeQuestion(questionIndex)} style={{cursor:"pointer" , marginLeft:"5px"}}></i>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col lg="3">
                                {question.options.map((option, optionIndex) => (
                                    <FormGroup key={optionIndex} check>
                                        <div className='search'>
                                            <input
                                                type="text"
                                                placeholder={`Enter option ${optionIndex + 1}`}
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                            />
                                            {optionIndex > 0 &&
                                                <i className="ri-delete-bin-line" onClick={() => removeOption(questionIndex, optionIndex)} style={{ marginLeft:"5px", cursor:"pointer"}}></i>}
                                        </div>
                                    </FormGroup>
                                ))}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <motion.button className='add-option-btn' onClick={() => addOption(questionIndex)} whileHover={{ scale: 1.05 }}>Add Option</motion.button>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Row className="mt-4">
                    <Col>
                        <motion.button className='add-q-btn' onClick={addQuestion} whileHover={{ scale: 1.05 }}>Add Question</motion.button>
                    </Col>
                </Row>
            </div>
            <div className='collect-btn' style={{ position: "absolute", top: "0", right: "0", marginRight: "80px", marginTop: "20px" }}>
                <Button className=" collect-btn" onClick={handleCreateSurvey} style={{ width: "170%", backgroundColor: "#0a1d37" }}>Collect</Button>
            </div>
        </Container>
    );
}
