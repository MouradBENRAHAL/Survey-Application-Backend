import { React, Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'

function TypeTEXT({ views }) {
    return (
        <div className="col-lg-4 col-md-12 col-sm-12">
            <ListGroup className="list-group mt-2">
                <Fragment key={10}>
                    <h5>Question {views.nq}: {views.question}</h5>
                    <ListGroup.Item key={1} className="list-group-item">
                        List of users responses
                    </ListGroup.Item>
                    {views.choices.map((c, j) => {
                        return (
                            <ListGroup.Item key={j} className="list-group-item">{c}</ListGroup.Item>
                        )
                    })}
                </Fragment>
            </ListGroup>
        </div>
    )
}

export default TypeTEXT
