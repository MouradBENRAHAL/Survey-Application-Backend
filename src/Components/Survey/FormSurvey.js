import React, { useState, useEffect } from 'react'
import './survey.css'
import { Accordion, Form, Button, Col, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const typeQuestion = [
    {
        label: "Multiple choice",
        value: "multipleChoice",
    },
    {
        label: "Unique choice",
        value: "uniqueChoice",
    },
    {
        label: "Short answer",
        value: "text",
    },
    {
        label: "Number",
        value: "number",
    },
    {
        label: "Image",
        value: "image"
    }
];

let Select_Type_Question = typeQuestion.map((option, key) => (
    <option key={key} value={option.value}>{option.label} </option>
));

const FormSurvey = ({ setSurvey, editSurvey, setEditSurvey }) => {
    const [FormSurvey, setFormSurvey] =
        useState(
            {
                id: uuidv4(),
                surveyName: '',
                surveyDescription: '',
                surveyQuestions: [{
                    question: '',
                    typeQuestion: '',
                    choices: ['', '']
                }]
            });

    //handle surveyName & surveyDescription 
    let handleChange = (event) => {
        setFormSurvey((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    //handle question 
    function handleChangeQuestion(i, event) {
        const values = { ...FormSurvey };
        values.surveyQuestions[i].question = event.target.value;
        setFormSurvey(values);
    }

    //handle type quesiton
    function handleChangeTypeQuestion(i, event) {
        const values = { ...FormSurvey };
        values.surveyQuestions[i].typeQuestion = event.target.value;
        setFormSurvey(values);
    }

    //handle choices inputs
    function handleChangeChoices(i, c, event) {
        const values = { ...FormSurvey };
        values.surveyQuestions[i].choices[c] = event.target.value;
        setFormSurvey(values);
    }

    //Add Accordion (Question) 
    let handleAddClick = () => {
        let values = [...FormSurvey.surveyQuestions];
        values.push({
            question: "",
            typeQuestion: "",
            choices: ['', '']
        });
        setFormSurvey(prev => ({ ...prev, surveyQuestions: values }));
    };

    //Delete Accordion (Question)
    let handleDeleteClick = i => {
        const values = [...FormSurvey.surveyQuestions];
        values.splice(i, 1);
        setFormSurvey(prev => ({ ...prev, surveyQuestions: values }));
    };

    //Add choice 
    function handleAddChoice(i) {
        const values = { ...FormSurvey };
        values.surveyQuestions[i].choices.push("")
        setFormSurvey(values);
    };

    //Remove choice from question[i]
    const handleRemoveChoice = (i, c) => {
        const values = [...FormSurvey.surveyQuestions];
        values[i].choices.splice(c, 1);
        setFormSurvey(prev => ({ ...prev, surveyQuestions: values }));
    };

    //Clear FormSurvey
    const clearState = () => {
        setFormSurvey({
            id: uuidv4(),
            surveyName: '',
            surveyDescription: '',
            surveyQuestions: [{
                question: '',
                typeQuestion: '',
                choices: ['', '']
            }]
        });
        setEditSurvey(null);
    }

    //Submit FormSurvey
    let handleSubmit = (e) => {
        e.preventDefault();
        //get UserConnected ID
        let accessToken = localStorage.getItem('token');
        axios.post("https://lit-taiga-43062.herokuapp.com/survey", FormSurvey,
            {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `${accessToken}`
                },
            })
            .then((res) => {
                const { _id, surveyName, surveyDescription } = res.data
                setSurvey({
                    _id, surveyName, surveyDescription
                },
                    console.log("success"))
            })
            .catch((error) => {
                console.log(error);
            });
        clearState()
    };

    //find the survey to edit
    useEffect(() => {
        if (editSurvey != null) {
            async function ViewOldSurvey() {
                await axios.get(`https://lit-taiga-43062.herokuapp.com/detailSurvey/${editSurvey}`)
                    .then((response) => {
                        setFormSurvey(response.data)
                    })
            }
            ViewOldSurvey();
        }
        
    }, [editSurvey])

    //Edit survey
    let EditSurvey = (e) => {
        e.preventDefault();
        //get UserConnected ID
        let accessToken = localStorage.getItem('token');
        axios.put(`https://lit-taiga-43062.herokuapp.com/updateSurvey/${editSurvey}`, FormSurvey,
            {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `${accessToken}`
                },
            })
            .then((res) => {
                const { _id, surveyName, surveyDescription } = res.data
                setSurvey({ _id, surveyName, surveyDescription })
                setEditSurvey(null);
            })
            .catch((error) => {
                console.log(error);
            });
        clearState();
    }

    return (
        <div key={FormSurvey.id}>
            <Form id="Survey" name="SurveyQuestion" onSubmit={handleSubmit}>
                <div className="mt-3" >
                    <div className="row">
                        <div className="col-lm-8 col-sm-6 col-12">
                            <h3>Create your survey</h3>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-12">
                            {editSurvey != null ?
                                <Button size="sm" type="submit" className="mt-2" style={{ paddingRight: "20px", paddingLeft: "20px", fontWeight: "600" }}
                                    variant="primary" onClick={(e) => { if (window.confirm('Are you sure to edit this survey ?')) EditSurvey(e) }}>
                                    Edit
                                </Button> :


                                <Button size="sm" type="submit" className="mt-2" style={{ paddingRight: "20px", paddingLeft: "20px", fontWeight: "600" }}
                                    variant="primary" onSubmit={handleSubmit}>
                                    Save
                                </Button>

                            }
                        </div>
                        <div className="col-lg-2 col-sm-3 col-12">
                            <Button size="sm" className="mt-2" style={{ paddingRight: "20px", paddingLeft: "20px", fontWeight: "600" }}
                                variant="outline-dark" onClick={clearState} >
                                Cancel
                            </Button>
                        </div>
                    </div>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicText" style={{ padding: '10px', borderRadius: '0.6em', border: '1px solid rgba(0, 0, 0, .125)' }} >
                        <Form.Label> <h6>Title</h6> </Form.Label>
                        <Form.Control name="surveyName" value={FormSurvey.surveyName} onChange={handleChange} type="text" />
                        <Form.Label className="mt-2"> <h6> Description </h6> </Form.Label>
                        <Form.Control as="textarea" name="surveyDescription" style={{ height: '5em' }} value={FormSurvey.surveyDescription} onChange={handleChange} />
                    </Form.Group>
                </div>
                {FormSurvey.surveyQuestions.map((question, i) => {
                    return (
                        <div key={i} className="mt-4">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Question {i + 1}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row">
                                            <div className="col-7">
                                                <Form.Group className="mb-3" controlId="formBasicText">
                                                    <Form.Text> <strong>Question </strong></Form.Text>
                                                    <Form.Control name="question" className="mt-2" type="text" placeholder="Enter your question"
                                                        key={i}
                                                        value={question.question}
                                                        onChange={(e) => { handleChangeQuestion(i, e) }} />
                                                </Form.Group>
                                            </div>
                                            <div className="col-5">
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Text> <strong> Type de question </strong></Form.Text>
                                                    <Form.Select name="typeQuestion" className="mt-2"
                                                        value={question.typeQuestion}
                                                        onChange={(e) => { handleChangeTypeQuestion(i, e) }}
                                                    >
                                                        <option></option>
                                                        {Select_Type_Question}
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {question.choices.map((choice, c) => {
                                            return (
                                                <Form.Group key={c} className="mb-3">
                                                    {(() => {
                                                        switch (question.typeQuestion) {
                                                            case 'uniqueChoice':
                                                                return (
                                                                    <Row key={c}>
                                                                        <Col xs={1} style={{ width: "5.33%" }}>
                                                                            <Form.Check style={{ fontSize: "1.4em" }} type="radio" disabled={true} />
                                                                        </Col>
                                                                        <Col xs={10} style={{ width: "88.3%" }}>
                                                                            <Form.Control name="choice"
                                                                                placeholder="choice"
                                                                                value={choice}
                                                                                onChange={(e) => { handleChangeChoices(i, c, e) }}
                                                                            >
                                                                            </Form.Control>
                                                                        </Col>
                                                                        <Col xs={1} style={{ width: "1em" }}>
                                                                            <i className="bi bi-x delete-choice" onClick={(e) => { handleRemoveChoice(i, c, e) }}></i>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            case 'multipleChoice':
                                                                return (
                                                                    <Row key={c}>
                                                                        <Col xs={1} style={{ width: "5.33%" }}>
                                                                            <Form.Check style={{ fontSize: "1.4em" }} type="checkbox" disabled={true} />
                                                                        </Col>
                                                                        <Col xs={10} style={{ width: "88.3%" }}>
                                                                            <Form.Control name="choice"
                                                                                placeholder="choice"
                                                                                value={choice}
                                                                                onChange={(e) => { handleChangeChoices(i, c, e) }}
                                                                            >
                                                                            </Form.Control>
                                                                        </Col>
                                                                        <Col xs={1} style={{ width: "1em" }}>
                                                                            <i className="bi bi-x delete-choice" onClick={(e) => { handleRemoveChoice(i, c, e) }}></i>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            case 'text':
                                                                if (c === 0) return (
                                                                    <Form.Control key={c} size="sm" name="text_input" type="text"
                                                                        onChange={(e) => { handleChangeChoices(i, c, e) }}
                                                                        placeholder="Enter your answer"
                                                                        disabled={true}
                                                                    />
                                                                )
                                                                break;
                                                            case 'number':
                                                                if (c === 0) return (
                                                                    <Form.Control key={c} size="sm" name="number_input" type="number"
                                                                        onChange={(e) => { handleChangeChoices(i, c, e) }}
                                                                        placeholder="Enter a number"
                                                                        disabled={true}
                                                                    />
                                                                )
                                                                break;
                                                            case 'image':
                                                                if (c === 0) return (
                                                                    <Form.Control key={c} size="sm" name="image_unput" type="file"
                                                                        onChange={(e) => { handleChangeChoices(i, c, e) }}
                                                                        disabled={true}
                                                                    />
                                                                )
                                                                break;
                                                            default: return (<div></div>);
                                                        }
                                                    })()}
                                                </Form.Group>
                                            )
                                        })}

                                        {(() => {
                                            if (question.typeQuestion)
                                                return (
                                                    < i className="bi bi-trash delete-icon" onClick={(e) => { handleDeleteClick(i, e) }}></i>
                                                )
                                        })()}
                                        {(() => {
                                            if ((question.typeQuestion === 'multipleChoice') || (question.typeQuestion === 'uniqueChoice'))
                                                return (
                                                    <div>
                                                        <i className="bi bi-plus add-icon" onClick={(e) => { handleAddChoice(i, e) }}> add new choice</i>
                                                    </div>
                                                )
                                        })()}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    )
                })}
                <div>
                    <Button size="sm" className="mt-3 mb-5 btn-add-question" variant="outline-primary" onClick={handleAddClick}> + new question</Button>
                </div>
            </Form>
        </div>
    )
}

export default FormSurvey;
