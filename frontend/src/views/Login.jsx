import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = () => {
    fetch("http://localhost:3000/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          window.sessionStorage.setItem("token", json.token);
          window.sessionStorage.setItem("userEmail", email);
          navigate("/tasks");
        } else {
          setError("Datos incorrectos");
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    login();
  };

  return (
    <div className="container mt-5">
      <main className="form-signin text-center">
        <h1 className="h3 mb-3 fw-normal">¡Bienvenido/a a la App de Lista de Tareas!</h1>

        <form className="col-md-6 offset-md-3 p-4 border rounded bg-light" onSubmit={handleSubmit}>
          <h3 className="h3 mb-4">Inicia sesión</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={handleEmail}
              id="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              value={password}
              type="password"
              className="form-control"
              onChange={handlePassword}
              id="password"
              placeholder="Clave"
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Ingresar
          </button>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
        <p className="mt-3 text-center">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            <b>Regístrate aquí</b>
          </span>
        </p>
        <p className="mt-3 text-center text-body-secondary">© David Rojas - 2023</p>
      </main>
    </div>
  );
}
