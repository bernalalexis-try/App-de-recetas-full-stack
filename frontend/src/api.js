import { FALLBACK_RECIPES } from './data/recipes'

const API_URL = 'http://localhost:5000/api'

async function tryFetch(path) {
  try {
    const res = await fetch(`${API_URL}${path}`)
    if (!res.ok) throw new Error('respuesta no ok')
    return await res.json()
  } catch (err) {
    return null
  }
}

export async function getRecetas({ categoria, dificultad, q } = {}) {
  const params = new URLSearchParams()
  if (categoria) params.set('categoria', categoria)
  if (dificultad) params.set('dificultad', dificultad)
  if (q) params.set('q', q)
  const query = params.toString() ? `?${params.toString()}` : ''

  const data = await tryFetch(`/recetas${query}`)
  if (data) return data

  return FALLBACK_RECIPES.filter((r) => {
    if (categoria && r.categoria !== categoria) return false
    if (dificultad && r.dificultad !== dificultad) return false
    if (q && !r.nombre.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })
}

export async function getReceta(id) {
  const data = await tryFetch(`/recetas/${id}`)
  if (data) return data
  return FALLBACK_RECIPES.find((r) => r.id === Number(id)) || null
}

export function imagenUrl(nombreArchivo) {
  return `/images/${nombreArchivo}`
}
