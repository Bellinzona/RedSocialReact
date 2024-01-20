import React, { useState, useContext, useEffect } from 'react';
import "./BusquedaUsuario.css";
import { Navbar } from '../../Componentes/Navbar';
import { contextoProvider } from '../../Contexto/Contexto';

export const BusquedaUsuario = () => {
    const { usuarios } = useContext(contextoProvider);
    console.log(usuarios)

    const [inputValue, setInputValue] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

    useEffect(() => {
        // Filtrar usuarios basados en el valor del input
        const filtrados = usuarios.filter(usuario =>
            usuario.nombreDeUsuario.toLowerCase().includes(inputValue.toLowerCase())
        );
        setUsuariosFiltrados(filtrados);
    }, [inputValue, usuarios]);

    return (
        <div className='todo'>
            <Navbar />

            <div className='containerPrincipal'>
                <input
                    type="text"
                    className='BuscarPerfil'
                    placeholder='Busca a un Perfil'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                {inputValue && (
                    <div className="Busqueda">
                        {usuariosFiltrados.map(usuario =>(
                            <div className="usuarioFiltrado" key={usuario.id}>
                                
                                <img src={usuario.fotoDePerfil} alt="" />
                                <p>{usuario.nombreDeUsuario}</p>

                            </div>
                        ))}




                    </div>
                )}
            </div>
        </div>
    );
};
