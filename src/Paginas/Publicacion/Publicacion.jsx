import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../Componentes/Navbar';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useParams } from 'react-router-dom';
import { contextoProvider } from '../../Contexto/Contexto';
import "./Publicacion.css"

export const Publicacion = () => {
    const [publicacion, setPublicacion] = useState(null);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const { id } = useParams();
    const { usuarioEnSesion } = useContext(contextoProvider);

    useEffect(() => {
        const obtenerPublicaciones = async () => {
            try {
                const publicacionesRef = collection(db, 'Publicaciones');
                const querySnapshot = await getDocs(publicacionesRef);

                // Buscar la publicación con el ID específico
                const publiEncontrada = querySnapshot.docs.find((doc) => doc.id === id);

                if (publiEncontrada) {
                    const publiData = publiEncontrada.data();
                    setPublicacion({ ...publiData, id: publiEncontrada.id });
                } else {
                    console.log('No se encontró la publicación con el ID especificado.');
                }
            } catch (error) {
                console.error('Error al obtener las publicaciones:', error);
            }
        };

        obtenerPublicaciones();
    }, [id]);

    const handleComentar = async () => {
        try {
            // Obtener el documento de la publicación
            const publicacionRef = doc(db, 'Publicaciones', id);

            // Actualizar el campo "comentarios" agregando el nuevo comentario
            await updateDoc(publicacionRef, {
                comentarios: arrayUnion({ usuario: usuarioEnSesion.nombreDeUsuario, comentario: nuevoComentario })
            });

            // Actualizar la vista local
            setPublicacion((prev) => {
                return { ...prev, comentarios: [...(prev.comentarios || []), { usuario: usuarioEnSesion.nombreDeUsuario, comentario: nuevoComentario }] };
            });

            // Limpiar el campo de comentario después de agregarlo
            setNuevoComentario('');
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    };

    return (
        <div className='todo'>
            <Navbar />
            {publicacion && (
                <div className="Publicacionnn">
                    <div className="informacionPerfil">
                        <img src={publicacion.fotoDePerfil} alt="" />
                        <p>{publicacion.Perfil}</p>
                    </div>
                    <div className="Texto">
                        <p>{publicacion.Texto}</p>
                        {publicacion.fotoPublicacion && <img src={publicacion.fotoPublicacion} alt="" />}
                    </div>

                    <div className="comentarPublicacion">
                        <input type="text" placeholder='Escribe un comentario...' value={nuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)} />
                        <button onClick={handleComentar}>Comentar</button>
                    </div>

                    <div className="todosComentarios">
                        
                            
                            {publicacion.comentarios && publicacion.comentarios.map((comentario, index) => (
                                <div className="comentarios">
                                    <h5>{comentario.usuario} :</h5>
                                <p key={index} className="comentario"> {comentario.comentario}</p>
                                </div>
                            ))}
                        
                    </div>
                </div>
            )}
        </div>
    );
};
