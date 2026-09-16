from fastapi import FastAPI
from database import engine, Base
import models # Importa os modelos que acabamos de criar

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API QuadraLivre",
    description="Backend para agendamento de quadras públicas.",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"status": "ok", "mensagem": "Servidor da QuadraLivre operante. Tabelas criadas."}