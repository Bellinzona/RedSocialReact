import React, { useContext, useEffect, useState } from 'react';
import "./PaginaPrincipal.css";
import { contextoProvider } from '../../Contexto/Contexto';
import { Navbar } from '../../Componentes/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import comentario from "../../assets/comentario.png"
import gusta from "../../assets/gusta.png"
import { Link } from 'react-router-dom';

export const PaginaPrincipal = () => {
    const { usuarioEnSesion } = useContext(contextoProvider);
    const [Publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const publicacionesRef = collection(db, "Publicaciones");
        getDocs(publicacionesRef).then((resp) => {
            setPublicaciones(resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }));

        });

    }, []);

    console.log(Publicaciones);

    console.log(usuarioEnSesion);
    return (
        <div className='ContainerPrincipal'>
            <Navbar></Navbar>
            <div className="Publicaciones">
                {Publicaciones.map((item, index) => (
                    <div key={index}>
                        <div className="Publicacion">
                            <div className="informacionPerfil">
                                <img src={item.fotoDePerfil} alt="" />
                                <p>{item.Perfil}</p>
                            </div>
                            <div className="Texto">
                                <p>{item.Texto}</p>
                                {item.fotoPublicacion && <img src={item.fotoPublicacion} alt="" />}
                            </div>

                            <div className='Interacciones'>
                                <Link to={`/Publicacion/${item.id}`} ><img src={comentario} alt="" className='comentar'/> </Link>
                                <span>{item.comentarios ? item.comentarios.length : 0}</span>
                                <img src={gusta} alt="" className='corazon' />



                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
