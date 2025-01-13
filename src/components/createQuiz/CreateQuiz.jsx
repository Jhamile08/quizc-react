import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_QUIZ } from "../../data/URLS"
import "./formStyle.css"


const createQuiz = async (newQuiz) => {
    const response = await fetch(URL_QUIZ, { // Cambia la URL según corresponda
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify(newQuiz), // Convertimos el objeto en una cadena JSON
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Quiz creado con éxito:', data);
        return data;  // Retornamos el objeto quiz creado, que incluye el id
    } else {
        console.error('Error al crear el quiz');
        return null;  // Si hay un error, retornamos null
    }
};


function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantityQuestions, setQuantityQuestions] = useState(0);
    const [img, setImg] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto que se enviará en la solicitud POST
        const newQuiz = {
            title,
            description,
            quantityQuestions,
            img,
        };

        try {
            // Llamar a la función para crear el quiz y esperar su respuesta
            const createdQuiz = await createQuiz(newQuiz);

            if (createdQuiz && createdQuiz.id) {
                console.log('Quiz creado:', createdQuiz);  // Deberías poder ver el objeto completo
                // Redirigir a la página de creación de preguntas con el id del quiz
                navigate(`/create/quiz/${createdQuiz.id}/questions/${quantityQuestions}`, { replace: true });
            } else {
                console.error('Error: Quiz creation failed');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };



    return (
        <div className="form-container">
            <h1>Create Quiz</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter quiz title"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter quiz description"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Quantity of Questions:</label>
                    <input
                        type="number"
                        value={quantityQuestions}
                        onChange={(e) => setQuantityQuestions(e.target.value)}
                        placeholder="Enter number of questions"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        placeholder="Enter image URL"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Add questions</button>
            </form>
        </div>

    )
}

export default Create