import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './quizPage.css'
import Results from './Results';

function QuizPage() {
    const { id } = useParams(); // Obtiene el id del quiz desde la URL
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    useEffect(() => {
        const fetchQuestions = async () => {
            console.log(`https://quizc.onrender.com/question/quiz/${id}`)
            const response = await fetch(`https://quizc.onrender.com/question/quiz/${id}`);
            const data = await response.json();
            setQuestions(data);

        };


        fetchQuestions();
    }, [id]); // Vuelve a hacer la petición si el id cambia


    const resultQuestion = (answerIndex) => {
        if (isAnswered) return; // Evita que se haga clic si ya se respondió

        setSelectedAnswer(answerIndex); // Guardamos la respuesta seleccionada
        setIsAnswered(true); // Marcamos que ya se respondió

        if (answerIndex !== 0) {
            setTimeout(() => {
                setResult((prevResult) => prevResult + 1); // Incrementamos el resultado si la respuesta es correcta
            }, 200); // Retraso de 0.2 segundos
        }

        // Si la respuesta es correcta (índice 0), esperamos 2 segundos antes de aplicar el borde verde
        if (answerIndex === 0) {
            setCorrectAnswerSelected(true); // Habilitamos la respuesta correcta
            setTimeout(() => {
                setResult((prevResult) => prevResult + 1); // Incrementamos el resultado si la respuesta es correcta
            }, 2000); // Retraso de 2 segundos para poner el borde verde
        }
    };

    // pass to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reseteamos la respuesta seleccionada
            setIsAnswered(false);

        } else {
            console.log("Fin del cuestionario");
            setShowResults(true);
        }

    };

    // shuffle the answers
    const shuffleAnswers = (answers) => {
        return answers
            .map((answer, index) => ({
                answer,
                originalIndex: index,
            }))
            .sort(() => Math.random() - 0.5); // Barajamos las respuestas
    };

    useEffect(() => {
        // Solo barajamos las respuestas cuando cambiamos de pregunta
        if (currentQuestion) {
            setShuffledAnswers(shuffleAnswers(currentQuestion.answers));
        }
    }, [currentQuestion]);

    // call the result component with params
    if (showResults) {
        return <Results score={result} totalQuestions={questions.length} />;
    }

    // show the actual question
    return (
        <div>
            <ul className="container-question" >
                {questions.length === 0 ? (
                    <p>Loading questions...</p>
                ) : (
                    <li className="content-question" key={currentQuestionIndex}> {/* Asegúrate de que question.id sea único */}
                        <h3>{currentQuestion.question}</h3>
                        <ul className="style-answer">
                            {shuffledAnswers.map((option) => (
                                <li
                                    onClick={() => resultQuestion(option.originalIndex)} // Solo actualizamos la respuesta
                                    key={option.originalIndex}
                                    className={`${selectedAnswer === option.originalIndex
                                        ? (option.originalIndex === 0 ? "correct" : "incorrect")
                                        : (option.originalIndex === 0 && isAnswered ? "correct" : "")} 
                                        ${selectedAnswer !== null ? "disabled" : ""}`} // Combina ambas clases
                                >
                                    {option.answer}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null} // Deshabilitado si no hay respuesta seleccionada
                        >
                            Next Question
                        </button>
                    </li>
                )}
            </ul >
        </div >
    );
}

export default QuizPage;
