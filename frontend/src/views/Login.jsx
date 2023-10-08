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
        email: email,
        password: password,
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
    <div className="container">
      <main className="form-signin text-center">
        <h1 className="h3 my-3 fw-normal">Bienvenid@ a tu lista de tareas</h1>

        <form className="my-5 p-5" onSubmit={handleSubmit}>
          <h3 className="h3 mb-3 fw-normal">Inicia sesión</h3>
          <div className="form-floating mb-3">
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={handleEmail}
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={password}
              type="password"
              className="form-control"
              onChange={handlePassword}
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Clave</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Ingresar
          </button>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <p className="mt-5 mb-3 text-body-secondary">© David Rojas - 2023</p>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <a
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            <b>Regístrate aquí</b>
          </a>
        </p>
      </main>
    </div>
  );
}