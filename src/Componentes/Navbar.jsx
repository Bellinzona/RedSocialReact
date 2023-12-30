import React, { useContext } from 'react'
import "./Navbar.css"
import { contextoProvider } from '../Contexto/Contexto'
import inicioImagen from "../assets/hogar.png"
import explorarImagen from "../assets/lupa.png"
import correoImagen from "../assets/correo.png"
import UsuarioImagen from "../assets/usuario.png"
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const { usuarioEnSesion } = useContext(contextoProvider);
  return (
    <div className="NavbarPrincipal">

            <div className="InformacionUsuario">

                <div className="info">

                    <img src={usuarioEnSesion.fotoDePerfil} alt="" />

                    <p>{usuarioEnSesion.nombreDeUsuario}</p>




                </div>




            </div>


            <div className="opciones">

                <div className="opcion">

                    <img src={inicioImagen} alt="" />
                    <p>Inicio</p>



                </div>

                <div className="opcion">

                    <img src={explorarImagen} alt="" />
                    <p>Explorar</p>



                </div>


                <div className="opcion">

                    <img src={correoImagen} alt="" />
                    <p>Mensajes</p>



                </div>


                <div className="opcion">

                    <img src={UsuarioImagen} alt="" />
                    <p>Usuario</p>



                </div>

                

            </div>

            <div className="mobileOptions">
                
                <div className="mobileOption">
                    <img src={inicioImagen} alt="" />
                </div>

                <div className="mobileOption">
                    <img src={explorarImagen} alt="" />
                </div>

                <div className="mobileOptionButton">
                    <button className='+'>+</button>
                </div>

                <div className="mobileOption">
                    <img src={correoImagen} alt="" />
                </div>

                <div className="mobileOption">
                    <img src={UsuarioImagen} alt="" />
                </div>
                
                
                




            </div>



            <Link to={"/CrearPublicacion"}><button className='Publicar'>Publicar</button></Link>

        </div>
  )
}
