from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# O banco será um arquivo local chamado quadralivre.sqlite3
SQLALCHEMY_DATABASE_URL = "sqlite:///./quadralivre.sqlite3"

# connect_args={"check_same_thread": False} é uma exigência do SQLite ao trabalhar com FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe base para criar os modelos
Base = declarative_base()