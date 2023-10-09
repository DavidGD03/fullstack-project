import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const owner = window.sessionStorage.getItem('userEmail');
    const navigate = useNavigate();

    const create = () => {
        fetch('http://localhost:3000/api/v1/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "deadline": deadline,
                "owner": owner
            })
        })
        .then(response => {
            if( response.status === 201 ) {
                alert("Tarea creada exitosamente");
                navigate("/tasks")
            } else {
                alert("Error, tarea no creada por sesión caducada");
                navigate("/")
            }
            return response.json();
        })
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleDeadline = (e) => {
        setDeadline(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        create();
    };

    return <section className="container">
    <form className="my-5 p-5 max-width-form" onSubmit={handleSubmit}>
        <h1 className="h3 my-3 fw-normal">Crea una nueva tarea</h1>
        <div className="form-floating">
            <input value={title} type="text" className="form-control"
                onChange={handleTitle}
                id="floatingInput" placeholder="Título de la tarea" />
            <label htmlFor="floatingInput">Título</label>
        </div>
        <div className="form-floating">
            <input value={description} type="text" className="form-control"
                onChange={handleDescription}
                id="floatingInput" placeholder="Descripción de la tarea" />
            <label htmlFor="floatingInput">Descripción</label>
        </div>
        <div className="form-floating">
            <input value={deadline} type="datetime-local" className="form-control"
                onChange={handleDeadline}
                id="floatingInput" />
            <label htmlFor="floatingInput">Fecha y hora límite</label>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Crear</button>
    </form>
</section>
};