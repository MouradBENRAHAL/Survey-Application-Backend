import { React, useState } from 'react';
import FormSurvey from './FormSurvey';
import ListSurvey from './ListSurvey'

const Survey = () => {

    const [survey, setSurvey] = useState({})
    const [editSurvey, setEditSurvey] = useState(null)
    return (
        <div className="container-fluid">
            <div className="row">
                <div key={1} className="col-md-6"> <ListSurvey survey={survey} setEditSurvey={setEditSurvey} /> </div>
                <div key={2} className="col-md-6"> <FormSurvey setSurvey={setSurvey} editSurvey={editSurvey} setEditSurvey={setEditSurvey} /> </div>
            </div>
        </div>
    )
}

export default Survey
