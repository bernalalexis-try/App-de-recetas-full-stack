import { useEffect, useState } from 'react'
import { getRecetas } from '../api'
import RecipeCard from '../components/RecipeCard'
import Filters from '../components/Filters'
import './Home.css'

export default function Home() {
  const [recetas, setRecetas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtros, setFiltros] = useState({ categoria: '', dificultad: '', q: '' })

  useEffect(() => {
    setCargando(true)
    getRecetas(filtros).then((data) => {
      setRecetas(data)
      setCargando(false)
    })
  }, [filtros.categoria, filtros.dificultad, filtros.q])

  const actualizarFiltro = (cambio) => setFiltros((f) => ({ ...f, ...cambio }))

  return (
    <main className="container home">
      <section className="home__hero">
        <span className="eyebrow">Recetario personal</span>
        <h1 className="home__title">10 recetas que siempre salen bien</h1>
        <p className="home__subtitle">
          De la tortilla del domingo al smoothie bowl del lunes: una colección
          chica, probada y lista para cocinar.
        </p>
      </section>

      <Filters {...filtros} onChange={actualizarFiltro} />

      {cargando ? (
        <p className="home__estado">Cargando recetas…</p>
      ) : recetas.length === 0 ? (
        <p className="home__estado">No encontramos recetas con esos filtros.</p>
      ) : (
        <div className="home__grid">
          {recetas.map((receta) => (
            <RecipeCard key={receta.id} receta={receta} />
          ))}
        </div>
      )}
    </main>
  )
}
