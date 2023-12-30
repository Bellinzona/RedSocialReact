import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../Paginas/Login/Login'
import { Registrarse } from '../Paginas/Registrarse/Registrarse'
import { PaginaPrincipal } from '../Paginas/PaginaPrincipal/PaginaPrincipal'
import { Posteo } from '../Paginas/Posteo/Posteo'
import { Publicacion } from '../Paginas/Publicacion/Publicacion'

export const Rutas = () => {
  return (
    <div>

        <BrowserRouter>

        <Routes>

            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/Registrarse' element={<Registrarse></Registrarse>}></Route>
            <Route path='/PaginaPrincipal' element={<PaginaPrincipal></PaginaPrincipal>}></Route>
            <Route path='/CrearPublicacion' element={<Posteo></Posteo>}></Route>
            <Route path='/Publicacion/:id' element={<Publicacion></Publicacion>}></Route>



        </Routes>
        
        
        
        </BrowserRouter>





    </div>
  )
}
