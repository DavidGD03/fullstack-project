import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Estado para el filtro
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para mostrar/ocultar la modal de confirmación
  const [taskToDelete, setTaskToDelete] = useState(null); // Estado para almacenar la tarea a eliminar
  const navigate = useNavigate();

  const getTasks = () => {
    fetch("http://localhost:3000/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        }
        return response.json();
      })
      .then((json) => {
        const userEmail = `${window.sessionStorage.getItem("userEmail")}`;
        const filteredTasks = json.tasks.filter((task) => task.owner === userEmail);
        setTasks(filteredTasks);
        setCurrentTasks(filteredTasks);
      });
  };

  const handleTaskStatusChange = (taskId, done) => {
    fetch(`http://localhost:3000/api/v1/tasks/changeStatus/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ done }),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        } else if (response.status === 200) {
          // Actualiza el estado de la tarea localmente en tiempo real
          const updatedTasks = tasks.map((task) =>
            task._id === taskId ? { ...task, done } : task
          );
          setTasks(updatedTasks);
          setCurrentTasks(updatedTasks);
        }
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Función para obtener las tareas según el filtro seleccionado
  const getFilteredTasks = () => {
    if (filter === "completed") {
      // Filtrar las tareas completadas
      const completedTasks = currentTasks.filter((task) => task.done);
      setCurrentTasks(completedTasks);
    } else if (filter === "pending") {
      // Filtrar las tareas pendientes
      const pendingTasks = currentTasks.filter((task) => !task.done);
      setCurrentTasks(pendingTasks);
    } else {
      // Mostrar todas las tareas
      getTasks();
    }
  };

  useEffect(() => {
    getFilteredTasks(); // Llamar a la función de filtrado al cargar el componente
  }, [filter]); // Escuchar cambios en el estado 'filter'

  // Función para mostrar la modal de confirmación
  const showDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  // Función para ocultar la modal de confirmación
  const hideDeleteConfirmation = () => {
    setTaskToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteTask = (taskId) => {
    // Realizar la petición DELETE al endpoint correspondiente
    fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        } else if (response.status === 204) {
          // Eliminar la tarea del estado local
          const updatedTasks = tasks.filter((task) => task._id !== taskId);
          setTasks(updatedTasks);
          hideDeleteConfirmation(); // Ocultar la modal después de eliminar
        }
      });
  };

  return (
    <section className="container mt-5">
      <h2>Bienvenido/a {window.sessionStorage.getItem("userEmail")}.<br />Estas son tus tareas:</h2>
      <div className="mb-3">
        <div className="btn-group" role="group">
          <button
            className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todas
          </button>
          <button
            className={`btn btn-outline-success ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completadas
          </button>
          <button
            className={`btn btn-outline-danger ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pendientes
          </button>
        </div>
      </div>
      {currentTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha límite</th>
              <th scope="col">Dueño tarea</th>
              <th scope="col">¿Realizada?</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>{new Date(c.deadline).toLocaleString("es-ES")}</td>
                <td>{c.owner}</td>
                <td>
                  {c.done ? (
                    <span className="badge bg-success">Sí</span>
                  ) : (
                    <span className="badge bg-danger">No</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${c.done ? "btn-warning" : "btn-success"}`}
                    onClick={() => handleTaskStatusChange(c._id, !c.done)}
                  >
                    {c.done ? "Marcar como Pendiente" : "Marcar como Completada"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/updateTask/${c._id}`)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => showDeleteConfirmation(c._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No existen tareas.</p>
      )}
      {/* Modal de confirmación de eliminación */}
      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        {/* ... (código de la modal) */}
      </div>
      {/* Fondo oscuro detrás de la modal */}
      <div
        className={`modal-backdrop fade ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      ></div>
    </section>
  );
}