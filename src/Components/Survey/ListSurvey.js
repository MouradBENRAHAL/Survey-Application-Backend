import { React, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './survey.css'
import axios from "axios";

function ListSurvey({ survey, setEditSurvey }) {
    const [list, setlistSurvey] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    async function DeleteSurvey(e, i) {
        await axios.delete(`https://lit-taiga-43062.herokuapp.com/deletesurvey/${list[i]._id}`)
            .then((res) => {
                setShouldRefresh(!shouldRefresh);
            });
    }

    function handleSurveyID(e, i) {
         setEditSurvey(list[i]._id);
    }
    
    useEffect(() => {
        //get UserConnected ID
        let accessToken = localStorage.getItem('token');
        axios.get("https://lit-taiga-43062.herokuapp.com/listSurveys", {
            headers: {
                "Content-Type": "application/json",
                'authorization': `${accessToken}`
            },
        }).then((response) => {
            setlistSurvey(response.data);
        });
    }, [survey, shouldRefresh]);

    return (
        <div className="container mt-3">
            <h3>Surveys List</h3>
            <div className="col-lg-10 col-md-12 col-sm-12 mt-4">
                <ListGroup className="list-group mt-2 ">
                    {list.map((survey, i) => {
                        return (
                            <ListGroup.Item key={i} className="list-group-item">
                                <div>
                                    <strong style={{ color: '#1c78fa' }} className="text-uppercase mr-4">
                                        {survey.surveyName}
                                    </strong>
                                </div>
                                <div className="mt-2">
                                    <strong>Descirption: </strong>
                                    <p style={{ textAlign: 'justify' }}>
                                        {survey.surveyDescription}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <Link style={{ textDecoration: 'none', position: 'absolute', top: '7px', right: '20px' }}
                                        exact to={`/viewStat/${survey._id}`}
                                        title="Take a look">
                                        <i className="bi bi-eye-fill"></i>
                                    </Link>
                                </div>
                                <div className="d-flex ml-auto">
                                    <span title="Delete" className="p-2" style={{ cursor: 'pointer' }}
                                        onClick={(e) => { if (window.confirm('Are you sure to delete this survey?')) DeleteSurvey(e, i) }}>
                                        <i className="bi bi-trash"></i>
                                    </span>
                                    <span title="Edit" className="p-2" style={{ cursor: 'pointer' }}
                                        onClick={(e) => { handleSurveyID(e, i) }}>
                                        edit
                                    </span>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </div>
    )
}

export default ListSurvey
