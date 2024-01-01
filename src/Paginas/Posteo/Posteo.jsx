import React, { useContext, useState } from 'react';
import { Navbar } from '../../Componentes/Navbar';
import { contextoProvider } from '../../Contexto/Contexto';
import { getStorage,uploadBytes,getDownloadURL } from "firebase/storage";
import "./Posteo.css";
import { Link } from 'react-router-dom';
import { ref } from 'firebase/storage';
import { db,storage } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export const Posteo = () => {
  const { usuarioEnSesion } = useContext(contextoProvider);
  const [textoPublicacion, setTextoPublicacion] = useState('');
  const [fotoPublicacion, setFotoPublicacion] = useState(null);


  const RecibirURL = async (imagen) => {
    try {
      const storageRef = ref(storage, `imagenes/${imagen.name}`);
      const snapshot = await uploadBytes(storageRef, imagen);
      console.log(snapshot);
  
      const imagenURL = await getDownloadURL(storageRef);
      console.log(imagenURL);
  
      return imagenURL;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el código de llamada.
    }
  };


  const añadirPublicacion = (archivo) =>{
    const archivoRef = collection(db,"Publicaciones")
    addDoc(archivoRef,archivo).then(() => {
      console.log("Publicacion Añadida")
    })


  }

  const handleTextoChange = (e) => {
    setTextoPublicacion(e.target.value);
  };

  const handleFotoChange = (e) => {
    // Puedes acceder al archivo seleccionado usando e.target.files[0]
    setFotoPublicacion(e.target.files[0]);
  };

  const handlePublicar = async (e) => {
    e.preventDefault();

    let fotoPublicacionURL = null;

    if (fotoPublicacion) {
      fotoPublicacionURL = await RecibirURL(fotoPublicacion);
    }
  
    const formData = {
      Perfil: usuarioEnSesion.nombreDeUsuario,
      Texto: textoPublicacion,
      fotoDePerfil: usuarioEnSesion.fotoDePerfil,
      fotoPublicacion: fotoPublicacionURL,
    };
  
    añadirPublicacion(formData);
   
    

    console.log('Texto de la publicación:', textoPublicacion);
    console.log('Foto de la publicación:', fotoPublicacion);

    // Agregar lógica adicional para enviar la publicación, por ejemplo, a un servicio o base de datos.
  };

  return (
    <div className='PosteoPage'>

      <Navbar></Navbar>

      <div className="CrearPublicacion">

        <Link to={"/PaginaPrincipal"}><p className='Cerrar'>X</p></Link>

        <img src={usuarioEnSesion.fotoDePerfil} alt="" />
        <textarea className='TextArea' placeholder='Cuenta tu ánimo' value={textoPublicacion} onChange={handleTextoChange}></textarea>

        <input type="file" className='fotoPublicacion' onChange={handleFotoChange} />

        <button className='PublicarPost' onClick={handlePublicar}>Publicar</button>
      </div>
    </div>
  );
};
