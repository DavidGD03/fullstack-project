import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false); // Estado para el cierre de sesión

  const handleLogout = () => {
    // Eliminar token y userEmail del localStorage
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("userEmail");
    
    // Establecer el estado de cierre de sesión en true
    setLoggedOut(true);
    
    // Redirigir al usuario a la raíz de la web
    navigate("/");
  };

  return (
    <nav id="sidebar" className="bg-light">
      <div className="p-4">
        <ul className="list-unstyled">
        <li className="mb-2">
            <Link to={`tasks`} className="btn btn-primary btn-block">
              Inicio
            </Link>
          </li>
        <li className="mb-2">
            <Link to={`tasks`} className="btn btn-primary btn-block">
              Todas mis tareas
            </Link>
          </li>
          <li className="mb-2">
            <Link to={`createTask`} className="btn btn-primary btn-block">
              Crear tarea
            </Link>
          </li>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ position: "absolute", bottom: "10px", left: "10px" }}
            >
              Cerrar sesión
            </button>
        </ul>
      </div>
    </nav>
  );
}