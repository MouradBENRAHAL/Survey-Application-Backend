import { React, Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'

const TypeIMAGE = ({ views }) => {
    return (
        <div className="mt-3 col-lg-12 col-md-12 col-sm-12">
            <ListGroup className="list-group mt-2 mb-5">
                <Fragment key={10}>
                    <h5>Question {views.nq}: {views.question}</h5>
                    <ListGroup.Item key={1} className="list-group-item">
                        pictures gallery
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item">
                        {views.choices.map((c, j) => {
                            return (
                                <img key={j} style={{ height: '100%', width: '20%', padding: '10px' }} src={(`https://lit-taiga-43062.herokuapp.com/${c}`)} />
                            )
                        })}
                    </ListGroup.Item>
                </Fragment>
            </ListGroup>
        </div>
    )
}

export default TypeIMAGE
