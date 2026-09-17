# QuadraLivre 🏀⚽

Um sistema web completo, acessível e seguro para agendamento de quadras esportivas públicas. Desenvolvido como Projeto Integrador.

## 🚀 Arquitetura e Tecnologias

O projeto adota uma arquitetura de API RESTful *stateless* desacoplada do frontend.

**Backend (API):**
* **Linguagem:** Python 3
* **Framework:** FastAPI (Alta performance, tipagem estática e documentação Swagger nativa)
* **Banco de Dados:** SQLite (com SQLAlchemy ORM)
* **Segurança:** 
  * Hashing irreversível de senhas com `Bcrypt`.
  * Autenticação via tokens **JWT (JSON Web Tokens)**.
  * Proteção de rotas e validação rigorosa de *inputs* (Prevenção de injeções e ataques) com `Pydantic`.

**Frontend (Interface):**
* **Tecnologias:** HTML5, CSS3, JavaScript (Vanilla)
* **Foco:** Acessibilidade (Diretrizes WCAG, alto contraste, tags ARIA) e design responsivo.
* **Comunicação:** Fetch API com tratamento de CORS e injeção de tokens de autorização em tempo de execução.

## ⚙️ Regras de Negócio Implementadas
- [x] Prevenção de conflito de horários (bloqueio de agendamentos sobrepostos).
- [x] Restrição de tempo (mínimo de 30 minutos, máximo de 2 horas).
- [x] Validação lógica de cronologia (hora de término obrigatoriamente superior à hora de início).
- [x] Listagem dinâmica de horários já ocupados por quadra.

## 🛠️ Como executar o projeto localmente

Você precisará de dois terminais para rodar o sistema de forma segregada.

### 1. Levantando a API (Backend)
Na raiz do projeto, ative o ambiente virtual e inicie o servidor Uvicorn:
```bash
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
A API estará disponível em http://127.0.0.1:8000.
A documentação interativa (Swagger) pode ser acessada em http://127.0.0.1:8000/docs.
2. Levantando a Interface (Frontend)

Em um novo terminal, navegue até a pasta frontend e suba um servidor HTTP simples:
Bash

cd frontend
python3 -m http.server 5500

Acesse o aplicativo pelo navegador em: http://localhost:5500.
