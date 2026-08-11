import { Link } from 'react-router-dom'
import { imagenUrl } from '../api'
import './RecipeCard.css'

const ETIQUETA_DIFICULTAD = {
  facil: 'Fácil',
  media: 'Media',
  dificil: 'Difícil',
}

export default function RecipeCard({ receta }) {
  return (
    <Link
      to={`/receta/${receta.id}`}
      className="recipe-card"
      style={{ '--card-color': receta.color }}
    >
      <div className="recipe-card__image-wrap">
        <img
          src={imagenUrl(receta.imagen)}
          alt={receta.nombre}
          className="recipe-card__image"
          loading="lazy"
        />
        <span className="recipe-card__label">{receta.categoria}</span>
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{receta.nombre}</h3>
        <p className="recipe-card__desc">{receta.descripcion}</p>
        <div className="recipe-card__meta">
          <span>{receta.tiempo_minutos} min</span>
          <span className="recipe-card__dot" />
          <span>{ETIQUETA_DIFICULTAD[receta.dificultad]}</span>
        </div>
      </div>
    </Link>
  )
}
