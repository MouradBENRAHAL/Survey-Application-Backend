import { React, Fragment } from 'react'
import { Bar } from 'react-chartjs-2';

import { chartColors } from "./colors";


const TypeMultiplesChoice = ({ views }) => {
    let answers = []
    let counter = []

    for (const [key, value] of Object.entries(views.choices)) {
        answers.push(key)
        counter.push(value)
    }

    const dataBar = {
        labels: answers,
        datasets: [
            {
                label: 'users answer',
                backgroundColor: chartColors,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: counter
            }
        ]
    };
    return (
        <div className="col-lg-4 col-md-12 col-sm-12">
            <h5>Question {views.nq}: {views.question}</h5>
            <Bar
                data={dataBar}
                width={80}
                height={80}
            />
        </div>
    )
}

export default TypeMultiplesChoice
