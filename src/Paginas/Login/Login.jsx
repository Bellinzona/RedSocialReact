import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { db } from '../../firebase/config'
import { contextoProvider } from '../../Contexto/Contexto'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [redirigir,setRedirigir] = useState(false)

  const { usuarios,setUsuarioSesion,usuarioEnSesion } = useContext(contextoProvider);
  console.log(usuarios)

  useEffect(() => {
    // Solo ejecuta el console.log si usuarioEnSesion no es null o undefined
    if (usuarioEnSesion) {
      console.log("Usuario en sesión:", usuarioEnSesion);
      
      
    }
  }, [usuarioEnSesion]); // Monitorea cambios en usuarioEnSesion


  const btnIniciarSesion = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);

    if (usuarioEncontrado) {
      // Verificar la contraseña
      if (usuarioEncontrado.contraseña === contraseña) {
        // Iniciar sesión con éxito
        alert("Inicio de sesión exitoso");
        setUsuarioSesion(usuarioEncontrado)
        console.log("aaaa", usuarioEnSesion)
        setRedirigir(true)
        // Puedes redirigir a la página de inicio o hacer otras acciones necesarias después de iniciar sesión
      } else {
        // Contraseña incorrecta
        alert("Usuario o contraseña incorrecta");
      }
    } else {
      // Usuario no encontrado
      alert("Usuario o contraseña incorrecta");
    }



    if (redirigir) {
      return <Navigate to="/PaginaPrincipal" />;
    }
  



  }

  
  return (
    <div className='LoginPage'>

        {redirigir && <Navigate to="/PaginaPrincipal" />}
        

        <form onSubmit={btnIniciarSesion} className="IniciarSesion">

            <h1>Iniciar Sesion</h1>

            <div className="Inputs">

            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Contraseña' value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            <Link to={"/Registrarse"}><p>No tenes Contraseña?</p></Link>
            



            </div>
        
            <button type='submit'>Iniciar Sesion</button>


        </form>




    </div>
  )
}
