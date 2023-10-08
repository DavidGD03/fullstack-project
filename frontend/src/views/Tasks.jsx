import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const getTasks = () => {
        fetch('http://localhost:3000/api/v1/tasks', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
            }
        })
            .then(response => {
                if( response.status === 401 ) navigate('/login');
                return response.json();
            })
            .then(json => {
                setTasks(json.tasks);
            })
    };
    useEffect(() => {
        getTasks();
    }, []);
    return <section>
        <h1>Contactos</h1>
        <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">¿Completada?</th>
                        </tr>
                    </thead>
            <tbody>
                {
                    tasks.map(c =>
                        <tr key={c._id}>
                            <th scope="row">{c.title}</th>
                            <td >{c.description}</td>
                            <td>{c.done}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </section>
};