from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# --- USUÁRIOS ---
class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int
    class Config:
        from_attributes = True

# --- QUADRAS ---
class QuadraBase(BaseModel):
    nome: str
    tipo: str
    localizacao: str

class QuadraCreate(QuadraBase):
    pass

class QuadraResponse(QuadraBase):
    id: int
    class Config:
        from_attributes = True

# --- AGENDAMENTOS ---
class AgendamentoCreate(BaseModel):
    quadra_id: int
    data_hora_inicio: datetime
    data_hora_fim: datetime

class AgendamentoResponse(BaseModel):
    id: int
    quadra_id: int
    usuario_id: int
    data_hora_inicio: datetime
    data_hora_fim: datetime
    class Config:
        from_attributes = True