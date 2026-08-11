# 🍳 Recetario

App full-stack de recetas de cocina: **React** en el front y **Flask + SQLite** en el back.
Cada receta tiene su propio color de identidad (inspirado en el plato real), que se
usa en su card y en su página de detalle.

Incluye 10 recetas cargadas de arranque: tortilla de papas, ensalada caprese,
milanesa napolitana, pasta al pesto, sopa de calabaza, empanadas de carne,
guacamole, tarta de manzana, risotto de hongos y smoothie bowl de frutos rojos.

## Cómo correrlo en local

### 1. Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 2. Frontend (React)

En otra terminal:
```bash
cd frontend
npm install
npm run dev
```

La app queda en `http://localhost:5173`.
