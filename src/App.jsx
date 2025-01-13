
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from "./components/home/Home.jsx"; // Componente para mostrar la lista de quizzes
import QuizPage from "./components/quiz/QuizPage.jsx";
import CreateQuiz from "./components/createQuiz/CreateQuiz.jsx";
import CreateQuestion from "./components/createQuiz/CreateQuestion.jsx";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Ruta para la lista de quizzes */}
        <Route path="/" element={<Home />} />
        {/* Ruta dinámica para un quiz específico */}
        <Route path="/question/quiz/:id" element={<QuizPage />} />
        {/* Ruta para crear quiz */}
        <Route path="/create/quiz" element={<CreateQuiz />} />
        <Route path="/create/quiz/:id/questions/:quantity" element={<CreateQuestion />} />

      </Routes>

    </div>
  );
}

export default App;


