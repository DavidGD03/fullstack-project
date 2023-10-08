import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    // Obtener detalles de la tarea a editar
    fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Tu sesión ha caducado, vuelve a ingresar");
          navigate("/");
        }
        return response.json();
      })
      .then((task) => {
        console.log(task.title);
        if (task.title) {
            setTitle(task.title);
          }
          if (task.description) {
            setDescription(task.description);
          }
          if (task.deadline) {
            // Parsea la fecha y hora
            const deadlineDate = new Date(task.deadline);

            // Formatea la fecha y hora en el formato deseado (yyyy-MM-ddThh:mm)
            const formattedDeadline = `${deadlineDate.getFullYear()}-${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}-${deadlineDate.getDate().toString().padStart(2, '0')}T${deadlineDate.getHours().toString().padStart(2, '0')}:${deadlineDate.getMinutes().toString().padStart(2, '0')}`;

            // Luego, establece el estado "deadline" con el formato deseado
            setDeadline(formattedDeadline);
          }
      });
  }, [taskId, navigate]);

  const update = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        deadline: deadline,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Tarea actualizada");
          navigate("/tasks");
        } else {
          alert("Error, tarea no actualizada debido a una sesión caducada");
          navigate("/");
        }
      });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  return (
    <section className="container">
      <form className="my-5 p-5" onSubmit={handleSubmit}>
        <h1 className="h3 my-3 fw-normal">Editar Tarea</h1>
        <div className="form-floating">
          <input
            value={title}
            type="text"
            className="form-control"
            onChange={handleTitle}
            id="floatingInput"
            placeholder="Título de la tarea"
          />
          <label htmlFor="floatingInput">Título</label>
        </div>
        <div className="form-floating">
          <input
            value={description}
            type="text"
            className="form-control"
            onChange={handleDescription}
            id="floatingInput"
            placeholder="Descripción de la tarea"
          />
          <label htmlFor="floatingInput">Descripción</label>
        </div>
        <div className="form-floating">
          <input
            value={deadline}
            type="datetime-local"
            className="form-control"
            onChange={handleDeadline}
            id="floatingInput"
          />
          <label htmlFor="floatingInput">Fecha y hora límite</label>
        </div>

        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
          Actualizar
        </button>
      </form>
    </section>
  );
}
