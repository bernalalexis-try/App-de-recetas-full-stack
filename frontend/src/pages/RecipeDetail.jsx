import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getReceta, imagenUrl } from '../api'
import './RecipeDetail.css'

const ETIQUETA_DIFICULTAD = {
  facil: 'Fácil',
  media: 'Media',
  dificil: 'Difícil',
}

export default function RecipeDetail() {
  const { id } = useParams()
  const [receta, setReceta] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [porciones, setPorciones] = useState(null)

  useEffect(() => {
    setCargando(true)
    getReceta(id).then((data) => {
      setReceta(data)
      setPorciones(data?.porciones ?? 1)
      setCargando(false)
    })
  }, [id])

  if (cargando) {
    return <main className="container detail__estado">Cargando receta…</main>
  }

  if (!receta) {
    return (
      <main className="container detail__estado">
        <p>No encontramos esa receta.</p>
        <Link to="/" className="detail__volver">
          ← Volver al recetario
        </Link>
      </main>
    )
  }

  const factor = porciones / receta.porciones

  return (
    <main className="detail" style={{ '--card-color': receta.color }}>
      <div className="detail__hero">
        <img
          src={imagenUrl(receta.imagen)}
          alt={receta.nombre}
          className="detail__hero-image"
        />
        <div className="detail__hero-overlay" />
        <div className="container detail__hero-content">
          <Link to="/" className="detail__volver detail__volver--light">
            ← Recetario
          </Link>
          <span className="detail__label">{receta.categoria}</span>
          <h1 className="detail__title">{receta.nombre}</h1>
        </div>
      </div>

      <div className="container detail__body">
        <p className="detail__desc">{receta.descripcion}</p>

        <div className="detail__meta">
          <div className="detail__meta-item">
            <span className="eyebrow">Tiempo</span>
            <strong>{receta.tiempo_minutos} min</strong>
          </div>
          <div className="detail__meta-item">
            <span className="eyebrow">Dificultad</span>
            <strong>{ETIQUETA_DIFICULTAD[receta.dificultad]}</strong>
          </div>
          <div className="detail__meta-item">
            <span className="eyebrow">Porciones</span>
            <div className="detail__porciones">
              <button
                onClick={() => setPorciones((p) => Math.max(1, p - 1))}
                aria-label="Menos porciones"
              >
                −
              </button>
              <strong>{porciones}</strong>
              <button
                onClick={() => setPorciones((p) => p + 1)}
                aria-label="Más porciones"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="detail__columns">
          <section>
            <h2 className="detail__heading">Ingredientes</h2>
            <ul className="detail__ingredientes">
              {receta.ingredientes.map((ing, i) => (
                <li key={i}>{escalarIngrediente(ing, factor)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="detail__heading">Preparación</h2>
            <ol className="detail__pasos">
              {receta.pasos.map((paso, i) => (
                <li key={i}>
                  <span className="detail__paso-num">{i + 1}</span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  )
}

function escalarIngrediente(texto, factor) {
  if (factor === 1) return texto
  const match = texto.match(/^(\d+(?:[.,]\d+)?)(.*)$/)
  if (!match) return texto
  const cantidad = parseFloat(match[1].replace(',', '.'))
  const escalada = cantidad * factor
  const redondeada = Number.isInteger(escalada)
    ? escalada
    : Math.round(escalada * 10) / 10
  return `${redondeada}${match[2]}`
}
