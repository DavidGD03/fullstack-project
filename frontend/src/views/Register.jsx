import { useState } from "react"
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
                "username" : username,
                "email": email,
                "password": password
            })
        })
        .then(response => {
            if( response.status === 201 ) {
                alert("Usuario creado exitosamente");
                navigate("/")
            } else {
                response.json().then(data => {
                    alert(data.message); // Accede al valor de "message" en la respuesta JSON
                });
            }
            return response.json();
        })
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
    };

    return <div className="container text-center">

        

        <form className="my-5 p-5" onSubmit={handleSubmit}>
        <h1 className="h3 my-3 fw-normal">Regístrate ahora</h1>
            <div className="form-floating">
                <input value={username} type="text" className="form-control"
                onChange={handleUsername}
                id="floatingInput" placeholder="Nombre de usuario" />
                <label htmlFor="floatingInput">Nombre de usuario</label>
            </div>
            <div className="form-floating">
                <input value={email} type="email" className="form-control"
                onChange={handleEmail}
                id="floatingInput" placeholder="example@mail.com" />
                <label htmlFor="floatingInput">Correo electrónico</label>
            </div>
            <div className="form-floating">
                <input value={password} type="password" className="form-control"
                onChange={handlePassword}
                id="floatingInput" placeholder="Clave" />
                <label htmlFor="floatingInput">Contraseña</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit" >Registrarse</button>
            <p className="mt-5 mb-3 text-body-secondary">© David Rojas - 2023</p>
        </form>
        <p>
                ¿Ya tienes una cuenta?{' '}
                <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <b>Ingresa aquí</b>
                </a>
            </p>
    </div>
};