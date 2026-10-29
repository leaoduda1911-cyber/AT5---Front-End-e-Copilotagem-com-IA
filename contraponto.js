// Modal dinâmico: troca o texto da reflexão a cada clique
const reflexoes = [
  "O feed mostra conquistas, não os bastidores. Quase ninguém publica as tentativas que deram errado.",
  "Compare o seu progresso de hoje com o seu progresso de seis meses atrás, e não com o de outra pessoa.",
  "Um certificado ajuda mais quando vem acompanhado de algo que você construiu e consegue explicar.",
  "Seguir pessoas por propósito deixa o feed mais útil e menos ansioso.",
  "Sentir que está atrasado é comum. Isso não significa que você esteja de fato atrasado."
];

let ultimoIndice = -1;

function sortearReflexao() {
  let indice;
  do {
    indice = Math.floor(Math.random() * reflexoes.length);
  } while (indice === ultimoIndice && reflexoes.length > 1);
  ultimoIndice = indice;
  document.getElementById("textoReflexao").textContent = reflexoes[indice];
}

document.getElementById("btnReflexao").addEventListener("click", sortearReflexao);
document.getElementById("btnOutraReflexao").addEventListener("click", sortearReflexao);
