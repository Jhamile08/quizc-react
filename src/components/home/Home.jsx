import React, { useEffect, useState } from "react";
import { URL_QUIZ } from "../../data/URLS"
import { Link } from "react-router-dom";
import './home.css'

function Home() {

    const [quizzes, setQuizzes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para mostrar/ocultar el modal
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Estado para guardar el quiz seleccionado



    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz); // Establece el quiz seleccionado
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
        setSelectedQuiz(null); // Limpia el quiz seleccionado
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch(URL_QUIZ);
            const data = await response.json();
            console.log(data.content);
            setQuizzes([...data.content]);
        }
        fetchQuizzes();
    }, []);


    if (quizzes.length === 0) {
        return <>
            <h1>Loading quizz...</h1>
        </>
    }

    // Renderiza los quizzes
    return (
        <div>
            <h1>Quiz list</h1>
            <Link to={`create/quiz`}>Create test</Link>
            <ul className="quiz-list">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="quiz-card">
                        <img src={quiz.img} alt="" className="quiz-img" />
                        <h2 className="quiz-title">{quiz.title}</h2>
                        <p className="quiz-description">{quiz.description}</p>
                        <button onClick={() => handleQuizClick(quiz)} className="quiz-btn">Let's do it</button>
                    </li>
                ))}
            </ul>


            {/* Modal */}
            {isModalOpen && selectedQuiz && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedQuiz.title}</h2>
                        <p>Quantity questions: {selectedQuiz.quantityQuestions}</p>
                        <p>Average time: {selectedQuiz.quantityQuestions * 2} minutes</p>
                        <button onClick={closeModal}>Cerrar</button>
                        <Link to={`question/quiz/${selectedQuiz.id}`}>Realizar test</Link>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Home