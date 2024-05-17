/**
 * React component for creating a survey.
 * 
 * Renders a form interface allowing users to create a survey.
 * Users can input a survey title, description, and multiple questions with options.
 * Add or remove questions and options.
 * Sent the survey data to a JSON Server via HTTP POST request for storage.
 * Error handling and toast notifications are included for user feedback.
 * 
 */


import { useState } from 'react';
import { Container, Button, FormGroup, Row, Col } from 'reactstrap';
import './CreateSurvey.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateSurvey() {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: [{ text: '' }, { text: '' }] }]);

    const handleSurveyTitleChange = (e) => {
        setSurveyTitle(e.target.value);
    };

    const handleSurveyDescriptionChange = (e) => {
        setSurveyDescription(e.target.value);
    };

    const handleQuestionChange = (index, e) => {
        const { value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };


    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [{ text: '' }, { text: '' }] }]);
    };

    const removeQuestion = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions.splice(questionIndex, 1);
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const { value } = e.target;
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
            toast.warning("You can't add more than 4 options!");
        }
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };



    const handleCreateSurvey = async () => {
        if (surveyTitle.trim() === '') {
            toast.warning("Survey title cannot be empty");
            return;
        }
        if (surveyDescription.trim() === '') {
            toast.warning("Survey description cannot be empty");
            return;
        }

        const emptyQuestionIndex = questions.findIndex(q => q.question.trim() === '');
        if (emptyQuestionIndex !== -1) {
            toast.warning(`Question ${emptyQuestionIndex + 1} cannot be empty`);
            return;
        }

        const emptyOptionIndex = questions.findIndex(q => q.options.some(o => o.text.trim() === ''));
        if (emptyOptionIndex !== -1) {
            const emptyQuestion = questions[emptyOptionIndex];
            const emptyOption = emptyQuestion.options.find(o => o.text.trim() === '');
            const emptyOptionIndexWithinQuestion = emptyQuestion.options.indexOf(emptyOption);
            toast.warning(`Option ${emptyOptionIndexWithinQuestion + 1} of Question ${emptyOptionIndex + 1} cannot be empty`);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/Surveys', {
                title: surveyTitle,
                description: surveyDescription,
                questions
            });

            console.log('Survey data saved:', response.data);
            toast.success('The Survey Has Been Created');
            setSurveyTitle('');
            setSurveyDescription('');
            setQuestions([{ question: '', options: [{ text: '' }, { text: '' }] }]);
        } catch (error) {
            console.error('Error saving survey data:', error);
        }
    };


    return (
        <Container style={{ position: "relative", border: "solid black", padding: "58px", marginTop: "100px", marginBottom: "70px", borderRadius: "20px" }}>
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
                    <Col lg="5">
                        <div className="formField">
                            <input
                                type="text"
                                required
                                value={surveyDescription}
                                onChange={handleSurveyDescriptionChange}
                            />
                            <span>Survey Description</span>
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
                                        <i className="ri-delete-bin-line question-delete-icon" onClick={() => removeQuestion(questionIndex)} style={{ cursor: "pointer", marginLeft: "5px" }}></i>
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
                                                required
                                                placeholder={`Enter option ${optionIndex + 1}`}
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                            />
                                            {optionIndex > 0 &&
                                                <i className="ri-delete-bin-line" onClick={() => removeOption(questionIndex, optionIndex)} style={{ marginLeft: "5px", cursor: "pointer" }}></i>}
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
            <motion.div className='collect-btn' whileHover={{ scale: 1.05 }} style={{ position: "absolute", top: "0", right: "-1.8%", marginRight: "80px", marginTop: "20px" }}>
                <Button className=" collect-btn" onClick={handleCreateSurvey} style={{ backgroundColor: "#0a1d37" }}>Collect</Button>
            </motion.div>
        </Container>);
}
