from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    senha_hash = Column(String) # Regra de ouro da segurança: NUNCA guardamos a senha, apenas o hash dela.

class Quadra(Base):
    __tablename__ = "quadras"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    tipo = Column(String) # Ex: Futsal, Basquete, Vôlei
    localizacao = Column(String)

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    quadra_id = Column(Integer, ForeignKey("quadras.id"))
    data_hora_inicio = Column(DateTime)
    data_hora_fim = Column(DateTime)

    # Relacionamentos para facilitar buscas depois
    usuario = relationship("Usuario")
    quadra = relationship("Quadra")