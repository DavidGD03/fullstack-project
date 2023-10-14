import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("userEmail");
    setLoggedOut(true);
    navigate("/");
  };

  return (
    <nav id="sidebar" className="bg-light">
  <div className="p-4">
    <ul className="list-unstyled">
    <li className="mb-2">
        <h4>
          Lista de Tareas
        </h4><br/>
      </li>
      <li className="mb-2">
        <Link to="/tasks" className="btn btn-primary btn-block">
          Inicio
        </Link>
      </li>
      <li className="mb-2">
        <Link to="/tasks" className="btn btn-primary btn-block">
          Todas mis tareas
        </Link>
      </li>
      <li className="mb-2">
        <Link to="/createTask" className="btn btn-primary btn-block">
          Crear tarea
        </Link>
      </li>
    </ul>
    <button onClick={handleLogout} className="btn btn-danger btn-block">
      Cerrar sesión
    </button>
  </div>
</nav>

  );
}
