import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = () => {
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then(response => {
        if (response.status === 201) {
          alert("Usuario creado exitosamente");
          navigate("/");
        } else {
          response.json().then(data => {
            alert(data.message); // Accede al valor de "message" en la respuesta JSON
          });
        }
        return response.json();
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="container mt-5">
      <form className="col-md-6 offset-md-3 p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <h1 className="h3 text-center mb-4">Regístrate ahora</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsername}
            placeholder="Nombre de usuario"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmail}
            placeholder="example@mail.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Clave"
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">Registrarse</button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes una cuenta?{' '}
        <span
          className="text-primary cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => navigate('/')}
        >
          <b>Ingresa aquí</b>
        </span>
      </p>
      <p className="mt-3 text-center text-body-secondary">© David Rojas - 2023</p>
    </div>
  );
}