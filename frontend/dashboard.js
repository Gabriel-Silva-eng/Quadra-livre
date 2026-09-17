const API_URL = 'http://127.0.0.1:8000';
const token = localStorage.getItem('quadralivre_token');

// 1. PROTEÇÃO DE ROTA: Se não tem token, volta pro login imediatamente
if (!token) {
    window.location.href = 'index.html';
}

const btnSair = document.getElementById('btn-sair');
const selectQuadra = document.getElementById('select-quadra');
const listaQuadrasDiv = document.getElementById('lista-quadras');
const formAgendamento = document.getElementById('form-agendamento');
const divStatus = document.getElementById('mensagem-status');

// --- UTILITÁRIOS ---
function mostrarStatus(mensagem, tipo) {
    divStatus.textContent = mensagem;
    divStatus.className = ''; 
    divStatus.classList.add(tipo === 'erro' ? 'msg-erro' : 'msg-sucesso');
}

function limparStatus() {
    divStatus.textContent = '';
    divStatus.className = 'escondido';
}

// --- LOGOUT ---
btnSair.addEventListener('click', () => {
    localStorage.removeItem('quadralivre_token'); // Destrói o token
    window.location.href = 'index.html';
});

// --- CARREGAR QUADRAS DA API ---
async function carregarQuadras() {
    try {
        const resposta = await fetch(`${API_URL}/quadras/`);
        if (resposta.ok) {
            const quadras = await resposta.json();
            renderizarQuadras(quadras);
            popularSelect(quadras);
        } else {
            listaQuadrasDiv.innerHTML = '<p style="color: var(--error-color)">Erro ao buscar quadras.</p>';
        }
    } catch (error) {
        listaQuadrasDiv.innerHTML = '<p style="color: var(--error-color)">Falha de conexão com o servidor.</p>';
    }
}

function renderizarQuadras(quadras) {
    if (quadras.length === 0) {
        listaQuadrasDiv.innerHTML = '<p>Nenhuma quadra cadastrada no sistema ainda.</p>';
        return;
    }
    
    listaQuadrasDiv.innerHTML = '';
    quadras.forEach(q => {
        const p = document.createElement('p');
        p.textContent = `ID ${q.id} - ${q.nome} (${q.tipo}) | Local: ${q.localizacao}`;
        p.style.borderBottom = '1px solid var(--border-color)';
        p.style.padding = '0.5rem 0';
        listaQuadrasDiv.appendChild(p);
    });
}

function popularSelect(quadras) {
    selectQuadra.innerHTML = '<option value="">-- Selecione uma Quadra --</option>';
    quadras.forEach(q => {
        const option = document.createElement('option');
        option.value = q.id;
        option.textContent = `${q.nome} (${q.tipo})`;
        selectQuadra.appendChild(option);
    });
}

// --- ENVIAR AGENDAMENTO (REQUER TOKEN) ---
formAgendamento.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparStatus();

    const quadra_id = document.getElementById('select-quadra').value;
    const data_hora_inicio = document.getElementById('data-inicio').value;
    const data_hora_fim = document.getElementById('data-fim').value;

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // AQUI ESTÁ A MÁGICA: Passando o token no cabeçalho
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
                quadra_id: parseInt(quadra_id),
                data_hora_inicio: data_hora_inicio,
                data_hora_fim: data_hora_fim
            })
        });

        if (resposta.ok) {
            mostrarStatus('Agendamento realizado com sucesso!', 'sucesso');
            formAgendamento.reset();
        } else {
            const erroData = await resposta.json();
            mostrarStatus(erroData.detail || 'Erro ao agendar.', 'erro');
        }
    } catch (error) {
        mostrarStatus('Falha na comunicação com o servidor.', 'erro');
    }
});

// Inicializa a página carregando as quadras
carregarQuadras();