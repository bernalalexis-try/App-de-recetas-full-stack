import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, Receta
from seed import RECETAS

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
        BASE_DIR, "recetas.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()
        if Receta.query.count() == 0:
            for data in RECETAS:
                db.session.add(Receta.from_dict(data))
            db.session.commit()

    @app.get("/api/recetas")
    def listar_recetas():
        query = Receta.query

        categoria = request.args.get("categoria")
        dificultad = request.args.get("dificultad")
        favorito = request.args.get("favorito")
        buscar = request.args.get("q")

        if categoria:
            query = query.filter(Receta.categoria == categoria)
        if dificultad:
            query = query.filter(Receta.dificultad == dificultad)
        if favorito is not None:
            query = query.filter(Receta.favorito == (favorito.lower() == "true"))
        if buscar:
            query = query.filter(Receta.nombre.ilike(f"%{buscar}%"))

        recetas = query.order_by(Receta.id).all()
        return jsonify([r.to_dict() for r in recetas])

    @app.get("/api/recetas/<int:receta_id>")
    def obtener_receta(receta_id):
        receta = Receta.query.get_or_404(receta_id)
        return jsonify(receta.to_dict())

    @app.post("/api/recetas")
    def crear_receta():
        data = request.get_json(force=True)
        receta = Receta.from_dict(data)
        db.session.add(receta)
        db.session.commit()
        return jsonify(receta.to_dict()), 201

    @app.put("/api/recetas/<int:receta_id>")
    def actualizar_receta(receta_id):
        receta = Receta.query.get_or_404(receta_id)
        data = request.get_json(force=True)
        nueva = Receta.from_dict(data)
        for campo in [
            "nombre", "descripcion", "categoria", "dificultad",
            "tiempo_minutos", "porciones", "color", "imagen",
            "ingredientes", "pasos", "favorito",
        ]:
            setattr(receta, campo, getattr(nueva, campo))
        db.session.commit()
        return jsonify(receta.to_dict())

    @app.patch("/api/recetas/<int:receta_id>/favorito")
    def alternar_favorito(receta_id):
        receta = Receta.query.get_or_404(receta_id)
        receta.favorito = not receta.favorito
        db.session.commit()
        return jsonify(receta.to_dict())

    @app.delete("/api/recetas/<int:receta_id>")
    def eliminar_receta(receta_id):
        receta = Receta.query.get_or_404(receta_id)
        db.session.delete(receta)
        db.session.commit()
        return "", 204

    @app.get("/api/categorias")
    def listar_categorias():
        categorias = db.session.query(Receta.categoria).distinct().all()
        return jsonify(sorted([c[0] for c in categorias]))

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
