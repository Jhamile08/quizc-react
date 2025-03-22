import React, { useEffect, useState } from "react";
import { URL_QUIZ } from "../../data/URLS";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(URL_QUIZ);
        if (!response.ok) {
          throw new Error("Error fetching quizzes");
        }
        const data = await response.json();
        setQuizzes(data.content || []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div>
      <h1>Quiz List</h1>
      <Link to={`create/quiz`} className="create-btn">Create test</Link>

      {quizzes.length === 0 ? (
        <p>No quizzes available. Create one!</p>
      ) : (
        <ul className="quiz-list">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="quiz-card">
              <img src={quiz.img} alt="" className="quiz-img" />
              <h2 className="quiz-title">{quiz.title}</h2>
              <p className="quiz-description">{quiz.description}</p>
              <button onClick={() => handleQuizClick(quiz)} className="quiz-btn">
                Let's do it
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && selectedQuiz && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedQuiz.title}</h2>
            <p>Quantity questions: {selectedQuiz.quantityQuestions}</p>
            <p>Average time: {selectedQuiz.quantityQuestions * 2} minutes</p>
            <button onClick={closeModal}>Close</button>
            <Link to={`question/quiz/${selectedQuiz.id}`}>Take the test</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
