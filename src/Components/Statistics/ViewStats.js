import { React, useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import '../Survey/survey.css'
import axios from "axios";
import TypeTEXT from './typeTEXT';
import TypeUniqueChoice from './typeUniqueChoice'
import TypeMultipleChoices from './typeMultiplesChoice'
import TypeIMAGE from './typeIMAGE'



function ViewStats() {
    //initialise Collect answer 
    const [views, setViews] =
        useState({ details: {}, stats: [{ choices: [], question: '', typeQuestion: '' }] });

    //get idsurvey
    const idSurvey = useParams();

    //get survey details
    useEffect(() => {
        axios.get(`https://lit-taiga-43062.herokuapp.com/${idSurvey.idSurvey}`)
            .then((response) => {
                setViews(response.data)
            })
    }, [idSurvey.idSurvey])

    return (
        <div className="container mt-3">
            <h1>{views.details.surveyName}</h1>
            <h5>Description: </h5><p>{views.details.surveyDescription}</p>
            <div className="mt-4">
                <div className="row">
                    {views.stats.map((s, i) => {
                        let type = s.typeQuestion
                        switch (type) {
                            case 'text':
                                return (<TypeTEXT views={s} />)
                                break;
                            case 'uniqueChoice':
                                return (<TypeUniqueChoice views={s} />)
                                break;
                            case 'multipleChoice':
                                return (<TypeMultipleChoices views={s} />)
                            case 'image':
                                return (<TypeIMAGE views={s}/>)
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default ViewStats
