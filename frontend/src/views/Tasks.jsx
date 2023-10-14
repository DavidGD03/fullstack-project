import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Estado para el filtro
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para mostrar/ocultar la modal de confirmación
  const [taskToDelete, setTaskToDelete] = useState(null); // Estado para almacenar la tarea a eliminar
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const navigate = useNavigate();

  const getTasks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks`, {
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
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/changeStatus/${taskId}`, {
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
      const completedTasks = tasks.filter((task) => task.done);
      setCurrentTasks(completedTasks);
    } else if (filter === "pending") {
      // Filtrar las tareas pendientes
      const pendingTasks = tasks.filter((task) => !task.done);
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
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/${taskId}`, {
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
          const updatedTasks = tasks.filter((task) => task._id !== taskId);
          setTasks(updatedTasks);
          setCurrentTasks(updatedTasks);
          hideDeleteConfirmation(); // Ocultar la modal después de eliminar
        }
      });
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTaskId(taskId === expandedTaskId ? null : taskId);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h3>Bienvenido/a <b>{window.sessionStorage.getItem("userEmail")}</b>.<br /><br />Estas son tus tareas:</h3><br />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
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
      </div>
      <div className="row">
        <div className="col-12">
          {currentTasks.length > 0 ? (
            <div className="accordion" id="taskAccordion">
              {currentTasks.map((c) => (
                <div className="card" key={c._id}>
                  <div className="card-header" id={`taskHeading${c._id}`}>
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#taskCollapse${c._id}`}
                        aria-expanded={expandedTaskId === c._id}
                        onClick={() => toggleTaskExpansion(c._id)}
                      >
                        {c.title}
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`taskCollapse${c._id}`}
                    className={`collapse ${expandedTaskId === c._id ? 'show' : ''}`}
                    aria-labelledby={`taskHeading${c._id}`}
                    data-parent="#taskAccordion"
                  >
                    <div className="card-body">
                      <p>Descripción: {c.description}</p>
                      <p>Fecha límite: {new Date(c.deadline).toLocaleString("es-ES")}</p>
                      <p>¿Realizada? {c.done ? 'Sí' : 'No'}</p>
                      <div className="btn-group" role="group">
                        <button
                          className={`btn btn-sm ${c.done ? "btn-warning" : "btn-success"}`}
                          onClick={() => handleTaskStatusChange(c._id, !c.done)}
                        >
                          {c.done ? "Pendiente" : "Completada"}
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/updateTask/${c._id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => showDeleteConfirmation(c._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No existen tareas.</p>
          )}
        </div>
      </div>
      <div className={`modal fade ${showDeleteModal ? "show" : ""}`} tabIndex="-1" style={{ display: showDeleteModal ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="close" onClick={hideDeleteConfirmation}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que deseas eliminar esta tarea?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hideDeleteConfirmation}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteTask(taskToDelete)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showDeleteModal ? "show" : ""}`} style={{ display: showDeleteModal ? "block" : "none" }}></div>
    </section>
  );
}