import './Filters.css'

const CATEGORIAS = ['Desayuno', 'Entrada', 'Plato principal', 'Postre']
const DIFICULTADES = [
  { valor: 'facil', etiqueta: 'Fácil' },
  { valor: 'media', etiqueta: 'Media' },
  { valor: 'dificil', etiqueta: 'Difícil' },
]

export default function Filters({ categoria, dificultad, q, onChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        className="filters__search"
        placeholder="Buscar receta…"
        value={q}
        onChange={(e) => onChange({ q: e.target.value })}
        aria-label="Buscar receta"
      />

      <div className="filters__row">
        <div className="filters__group" role="group" aria-label="Filtrar por categoría">
          <button
            className={`filters__chip ${categoria === '' ? 'is-active' : ''}`}
            onClick={() => onChange({ categoria: '' })}
          >
            Todas
          </button>
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              className={`filters__chip ${categoria === c ? 'is-active' : ''}`}
              onClick={() => onChange({ categoria: c })}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="filters__group" role="group" aria-label="Filtrar por dificultad">
          {DIFICULTADES.map((d) => (
            <button
              key={d.valor}
              className={`filters__chip filters__chip--outline ${
                dificultad === d.valor ? 'is-active' : ''
              }`}
              onClick={() =>
                onChange({ dificultad: dificultad === d.valor ? '' : d.valor })
              }
            >
              {d.etiqueta}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
