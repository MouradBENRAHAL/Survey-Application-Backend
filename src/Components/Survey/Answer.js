import { React, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Col, Row, Button, Form } from 'react-bootstrap'
import axios from "axios";

function Answer(props) {
    //initialise Collect answer 
    const [CollectAnswer, setCollectAnswer] = useState([]);

    //get idsurvey
    const idPreview = useParams();

    //handle survey details
    const [SurveyJsonObjects, setSurveyJsonObjects] = useState({
        surveyQuestions: [],
        surveyName: "",
        surveyDescription: "",
        _id: ""
    });

    const [value, setValue] = useState([])
    
    //get survey details
    useEffect(() => {
        async function SurveyDetails() {
            await axios.get(`https://lit-taiga-43062.herokuapp.com/detailSurvey/${idPreview.idPreview}`)
                .then((response) => {
                    setSurveyJsonObjects(response.data);
                    let value = (response.data.surveyQuestions.map((q, i) => {
                        if (q.typeQuestion === 'image') {
                            return ({ answer: [], question: q._id, type: q.typeQuestion })
                        }
                        else {
                            return ({ answer: [], question: q._id })
                        }
                    }))
                    setCollectAnswer(value)
                    let warning = value[0].question
                    setValue(warning)
                })
        }
        SurveyDetails();
    }, [idPreview.idPreview, value ])

    //handle multiple_choices
    function handleMultipleChoices(i, c, e) {
        const values = [...CollectAnswer];
        if (e.target.checked)
            values[i].answer.push(e.target.value);  //add when it's checked
        else {
            let index = values[i].answer.indexOf(c)
            values[i].answer.splice(index, 1) //removed when it's unchecked
        }
        setCollectAnswer(values);
    }

    //handle Unique Choices
    function handleUniqueChoice(i, c, e) {
        const values = [...CollectAnswer];
        values[i].answer.push(e.target.value);
        setCollectAnswer(values);
    }

    //handle text inputs
    function handleChangeChoice(i, e) {
        const values = [...CollectAnswer];
        values[i].answer[0] = e.target.value;
        setCollectAnswer(values);
    }

    //handle image
    const [picture, setPicture] = useState();
    const onChangePicture = (i, e) => {
        const values = [...CollectAnswer];
        setPicture(URL.createObjectURL(e.target.files[0]));
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = function () {
            values[i].answer = [reader.result];
            setCollectAnswer(values);
        };
    };

    //Submit FormSurvey
    let handleSubmit = (e) => {
        e.preventDefault();
        //get SurveyId
        let surveyId = SurveyJsonObjects._id

        //get UserConnected ID
        let accessToken = localStorage.getItem('token');
     
        axios.post("https://lit-taiga-43062.herokuapp.com/answer", { answers: CollectAnswer, surveyId },
            {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `${accessToken}`
                },
            })
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(CollectAnswer)
    };

    return (
        <div key={SurveyJsonObjects._id} className="container mt-3">
            <h3> {SurveyJsonObjects.surveyName}</h3>
            <p> {SurveyJsonObjects.surveyDescription} </p>
            <Form onSubmit={handleSubmit}>
                {SurveyJsonObjects.surveyQuestions.map((question, i) => {
                    return (
                        <div key={i} className="row">
                            <div className="col-7">
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Text value={question.question}> <strong >Question {1 + i} : </strong></Form.Text>
                                    <Form.Label key={i} className="mb-2"> {question.question} ?</Form.Label>
                                    {question.choices.map((choice, c) => {
                                        return (
                                            <Form.Group key={c} className="mb-3" >
                                                {(() => {
                                                    switch (question.typeQuestion) {
                                                        case 'uniqueChoice':
                                                            return (
                                                                <Row >
                                                                    <Col xs={1} style={{ width: "5.33%" }}>
                                                                        <Form.Check key={c} style={{ fontSize: "1.4em" }}
                                                                            type="radio"
                                                                            name="radioChoices"
                                                                            value={choice}
                                                                            onChange={(e) => { handleUniqueChoice(i, c, e) }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={10} style={{ width: "88.3%" }}>
                                                                        <Form.Text name="answer">
                                                                            {choice}
                                                                        </Form.Text>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        case 'multipleChoice':
                                                            return (
                                                                <Row >
                                                                    <Col xs={1} style={{ width: "5.33%" }}>
                                                                        <Form.Check key={c} style={{ fontSize: "1.4em" }}
                                                                            type="checkbox"
                                                                            value={choice}
                                                                            onChange={(e) => { handleMultipleChoices(i, c, e) }}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={10} style={{ width: "88.3%" }}>
                                                                        <Form.Text name="choice">
                                                                            {choice}
                                                                        </Form.Text>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        default: return (<div></div>)
                                                    }
                                                })()}
                                            </Form.Group>
                                        )
                                    })}
                                    {(() => {
                                        switch (question.typeQuestion) {
                                            case 'text':
                                                return (
                                                    <Form.Control size="sm" name="answer" type="text"
                                                        placeholder="Enter your answer"
                                                        onChange={(e) => { handleChangeChoice(i, e) }}
                                                    />
                                                )
                                            case 'number':
                                                return (
                                                    <Form.Control size="sm" name="answer" type="number"
                                                        placeholder="Enter a number"
                                                        onChange={(e) => { handleChangeChoice(i, e) }}
                                                    />
                                                )
                                            case 'image':
                                                return (
                                                    <div>
                                                        <Form.Control size="sm"
                                                            type="file"
                                                            onChange={(e) => { onChangePicture(i, e) }}
                                                        />
                                                        <img className="picture_surveyAnswer mt-2" src={picture} alt='' />
                                                    </div>
                                                )
                                            default: return (<div></div>)
                                        }
                                    })()}
                                </Form.Group>
                            </div>
                        </div>
                    )
                })}
                <Button type="submit" className="mt-2 mb-5"> Submit your answers</Button>
            </Form>
        </div>
    )
}

export default Answer
