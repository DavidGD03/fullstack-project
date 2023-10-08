import { Link } from "react-router-dom";


export default function SideBar () {
    return <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{'width': '280px'}}>

    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
      <Link to={`login`}>Login</Link>
      </li>
      <li>
      <Link to={`task/1`}>Ver Tarea</Link>
      </li>
      <li>
      <Link to={`tasks`}>Tareas</Link>
      </li>
    </ul>
    <hr/>
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
      </ul>
    </div>
  </div>
};