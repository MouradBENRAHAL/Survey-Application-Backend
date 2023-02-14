import { React, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from "axios";

function Home() {
    const [survey, setSurvey] = useState([]);
    useEffect(() => {
        axios.get('https://lit-taiga-43062.herokuapp.com/allSurveys').then((response) => {
            setSurvey(response.data);
        });
    }, [])
    return (
        <div>
            <div className="container mt-5" style={{ borderRadius: '.55em'}}>
                <div className="row">
                    {survey.map((s, i) => {
                        return (
                            <div key={i} className="col-3 mb-4">
                                <Card border="primary" style={{ width: 'auto', height: '100%' }}>
                                    <Card.Body>
                                        <Card.Title> <strong>Survey: </strong> {s.surveyName}</Card.Title>
                                        <Card.Text>
                                            <strong>Description: </strong> {s.surveyDescription}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="mt-2 text-center">
                                        <Link style={{ textDecoration: 'none'}}
                                            exact to={`/answer/${s._id}`}
                                            title="Take a look">
                                            <span>answer this survey</span>
                                            <i className="bi bi-pencil-fill" style={{ fontSize: '1rem', color: 'cornflowerblue', marginLeft:'0.4em' }}></i>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })}
                    <div className="col-3 mb-4">
                        <Link style={{ textDecoration: 'none', fontSize:'1.2em' }}
                            exact to={`/survey`}
                            title="Take a look">
                            <i className="bi bi-plus-square-fill"></i>  <span> Create Survey </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
