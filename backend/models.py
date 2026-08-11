from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()


class Receta(db.Model):
    __tablename__ = "recetas"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    descripcion = db.Column(db.String(300), nullable=False, default="")
    categoria = db.Column(db.String(60), nullable=False)
    dificultad = db.Column(db.String(20), nullable=False)
    tiempo_minutos = db.Column(db.Integer, nullable=False)
    porciones = db.Column(db.Integer, nullable=False, default=4)
    color = db.Column(db.String(7), nullable=False, default="#8A7B5C")
    imagen = db.Column(db.String(200), nullable=False)
    ingredientes = db.Column(db.Text, nullable=False, default="[]")
    pasos = db.Column(db.Text, nullable=False, default="[]")
    favorito = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "categoria": self.categoria,
            "dificultad": self.dificultad,
            "tiempo_minutos": self.tiempo_minutos,
            "porciones": self.porciones,
            "color": self.color,
            "imagen": self.imagen,
            "ingredientes": json.loads(self.ingredientes),
            "pasos": json.loads(self.pasos),
            "favorito": self.favorito,
        }

    @staticmethod
    def from_dict(data):
        return Receta(
            nombre=data.get("nombre", ""),
            descripcion=data.get("descripcion", ""),
            categoria=data.get("categoria", ""),
            dificultad=data.get("dificultad", "facil"),
            tiempo_minutos=data.get("tiempo_minutos", 0),
            porciones=data.get("porciones", 4),
            color=data.get("color", "#8A7B5C"),
            imagen=data.get("imagen", ""),
            ingredientes=json.dumps(data.get("ingredientes", []), ensure_ascii=False),
            pasos=json.dumps(data.get("pasos", []), ensure_ascii=False),
            favorito=data.get("favorito", False),
        )
