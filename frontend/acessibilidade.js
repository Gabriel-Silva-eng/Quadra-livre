// --- CONTROLE DE ACESSIBILIDADE ---
const btnAumentar = document.getElementById('btn-aumentar-fonte');
const btnDiminuir = document.getElementById('btn-diminuir-fonte');
const btnContraste = document.getElementById('btn-alto-contraste');
const rootHtml = document.documentElement; // A tag 

// Tamanho base da fonte
let tamanhoFonte = parseInt(localStorage.getItem('quadralivre_fonte')) || 16;
rootHtml.style.fontSize = `${tamanhoFonte}px`;

// Verifica se o usuário já havia ativado o alto contraste antes
if (localStorage.getItem('quadralivre_contraste') === 'ativo') {
    document.body.classList.add('alto-contraste');
}

// Aumentar Fonte (Limite de 24px para não quebrar o layout)
btnAumentar.addEventListener('click', () => {
    if (tamanhoFonte < 24) {
        tamanhoFonte += 2;
        rootHtml.style.fontSize = `${tamanhoFonte}px`;
        localStorage.setItem('quadralivre_fonte', tamanhoFonte);
    }
});

// Diminuir Fonte (Limite mínimo de 12px)
btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 12) {
        tamanhoFonte -= 2;
        rootHtml.style.fontSize = `${tamanhoFonte}px`;
        localStorage.setItem('quadralivre_fonte', tamanhoFonte);
    }
});

// Alternar Alto Contraste
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    if (document.body.classList.contains('alto-contraste')) {
        localStorage.setItem('quadralivre_contraste', 'ativo');
    } else {
        localStorage.removeItem('quadralivre_contraste');
    }
});