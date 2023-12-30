import React, { useContext, useState } from 'react';
import { contextoProvider } from '../../Contexto/Contexto';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { db,storage } from '../../firebase/config';

import "./Registrarse.css";

export const Registrarse = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [nombreDeUsuario, setNombreDeUsuario] = useState('');
  const [fotoDePerfil, setFotoDePerfil] = useState(null);

  const { usuarios } = useContext(contextoProvider);

  
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



  const añadirUsuario = (archivo) =>{
    const archivoRef = collection(db,"Usuarios")
    addDoc(archivoRef,archivo).then(() => {
      console.log("Usuario Añadido")
    })


  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Verificar si el nombre de usuario ya existe
      const usuarioExistente = usuarios.find((usuario) => usuario.nombreDeUsuario === nombreDeUsuario);
  
      if (usuarioExistente) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return;
      }
  
      if (contraseña !== confirmarContraseña) {
        alert("Las contraseñas no coinciden.");
        return;
      }
  
      // Obtener la URL de la imagen de manera asíncrona
      const fotoDePerfilURL = await RecibirURL(fotoDePerfil);
  
      const formData = {
        nombre,
        apellido,
        email,
        contraseña,
        nombreDeUsuario,
        fotoDePerfil: fotoDePerfilURL,
        publicaciones: []
      };


  
      // Añadir usuario después de obtener la URL de la imagen
      añadirUsuario(formData);
      console.log('Datos del formulario:', formData);
      // Restablecer el estado del formulario después de enviar o almacenar los datos.
      setNombre('');
      setApellido('');
      setEmail('');
      setContraseña('');
      setConfirmarContraseña('');
      setNombreDeUsuario('');
      setFotoDePerfil(null);
    } catch (error) {
      console.error('Error durante el registro:', error);
      // Aquí puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  return (
    <div className='RegisterPage'>
      <form onSubmit={handleSubmit}>
        <h1>Registrarse</h1>

        <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />

        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder='Contraseña' value={contraseña} onChange={(e) => setContraseña(e.target.value)} />

        <input type="password" placeholder='Confirmar Contraseña' value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />

        <input type="text" placeholder='Nombre De Usuario' value={nombreDeUsuario} onChange={(e) => setNombreDeUsuario(e.target.value)} />

        <input type="file" placeholder='Foto De Perfil' onChange={(e) => setFotoDePerfil(e.target.files[0])} />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
