import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'



export const contextoProvider = React.createContext()

export const Contexto = ({children}) => {

  const [usuarios,setUsuarios] = useState([])
  const [usuarioEnSesion,setUsuarioSesion] = useState([])
  const [Publicaciones,setPublicaciones] = useState([])




  useEffect(() => {
    const usuariosRef = collection(db, "Usuarios");
    getDocs(usuariosRef).then((resp) => {
      setUsuarios(resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        }));
    
    });

}, []);







  






  return (
    <div><contextoProvider.Provider value={{usuarios,setUsuarioSesion,usuarioEnSesion,Publicaciones}}> {children} </contextoProvider.Provider></div>
  )
}
