import React from 'react';
import { Link } from "react-router-dom";

function Results({ score, totalQuestions }) {

    return (
        <div>
            <h2>Resultados del Test</h2>
            <p>Tu puntuación es: {score} de {totalQuestions}</p>
            <Link to={`/`}>Volver a los test</Link>
        </div>

    );
}

export default Results;