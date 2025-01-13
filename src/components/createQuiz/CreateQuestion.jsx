import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_PREGUNTAS } from "../../data/URLS"
import "./formStyle.css"

const CreateQuestion = async (newQuestion) => {

    const response = await fetch(URL_PREGUNTAS, { // Cambia la URL según corresponda
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify(newQuestion), // Convertimos el objeto en una cadena JSON
    });

    if (response.ok) {
        const data = await response.json();
        console.log('pregunta creada con éxito:', data);
        return data;  // Retornamos el objeto quiz creado, que incluye el id
    } else {
        console.error('Error al crear el question');
        return null;  // Si hay un error, retornamos null
    }
};


function Create() {

    const { id, quantity } = useParams();
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [questionsCreated, setQuestionsCreated] = useState(0);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const numericId = parseInt(id, 10); // Convierte el `id` a un número entero
    const numericQuantity = parseInt(quantity, 10);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (questionsCreated < numericQuantity) {
            setQuestionsCreated(questionsCreated + 1);
        }

        if (questionsCreated + 1 === numericQuantity) {
            setSuccessMessage(true);
        }


        // Crear el objeto que se enviará en la solicitud POST
        const newQuestion = {
            quiz: numericId,
            question: question,
            answers: [answer1, answer2, answer3]
        };
        console.log(newQuestion)

        CreateQuestion(newQuestion);
        setQuestionsCreated(questionsCreated + 1);

        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setSubmitted(true);

    };
    useEffect(() => {


        if (successMessage) {
            const timer = setTimeout(() => {
                navigate("/"); // Cambia "/home" a la ruta correspondiente
            }, 2000);

            return () => clearTimeout(timer); // Limpia el temporizador
        }
    }, [successMessage, navigate]);


    return (
        <div className="form-container">
            <h1>Create Questions</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter question"
                    />
                </div>
                <div className="form-group">
                    <label>Correct Answer:</label>
                    <input
                        type="text"
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                        placeholder="Answer 1"
                    />
                </div>
                <div className="form-group">
                    <label>Answer 2:</label>
                    <input
                        type="text"
                        value={answer2}
                        onChange={(e) => setAnswer2(e.target.value)}
                        placeholder="Answer 2"
                    />
                </div>
                <div className="form-group">
                    <label>Answer 3:</label>
                    <input
                        type="text"
                        value={answer3}
                        onChange={(e) => setAnswer3(e.target.value)}
                        placeholder="Answer 3"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={questionsCreated >= numericQuantity}>
                    Create Question
                </button>
            </form>

            {successMessage && (
                <p className="success-message">
                    All questions created successfully! Redirecting to home...
                </p>
            )}
        </div>

    )
}

export default Create