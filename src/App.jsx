import { useState } from 'react'
import { Contexto } from './Contexto/Contexto'
import { Rutas } from './Rutas/Rutas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <Contexto>
        <Rutas></Rutas>




      </Contexto>




    </div>
  )
}

export default App
