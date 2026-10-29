

const perguntas = [
  "Quando vejo alguém postar uma conquista no LinkedIn, sinto que estou ficando para trás.",
  "Comparo meu currículo com o de colegas que aparecem no meu feed.",
  "Fico inquieto(a) quando passo muito tempo sem abrir o LinkedIn.",
  "Tenho medo de perder uma oportunidade profissional por não estar sempre atento(a) à plataforma.",
  "Sinto que preciso de mais uma certificação para ser levado(a) a sério.",
  "Já comecei um curso ou certificação só porque vi outras pessoas fazendo.",
  "Me sinto mal quando alguém da minha idade consegue um estágio ou vaga antes de mim.",
  "Penso que todo mundo está avançando mais rápido do que eu na carreira.",
  "Evito postar minhas conquistas por achar que elas são pequenas perto das dos outros.",
  "Depois de usar o LinkedIn, costumo me sentir mais ansioso(a) com o meu futuro profissional."
];

const faixas = [
  {
    max: 23,
    nivel: "Baixo",
    classe: "success",
    descricao: "A vitrine parece pesar pouco no seu dia a dia. Você tende a usar o LinkedIn sem se comparar demais.",
    dicas: [
      "Continue usando a plataforma com um objetivo claro (vagas, networking, aprendizado).",
      "Mantenha o hábito de comparar com o seu próprio progresso."
    ]
  },
  {
    max: 36,
    nivel: "Moderado",
    classe: "warning",
    descricao: "Em alguns momentos a vitrine mexe com você. É comum entre estudantes e vale ficar atento(a).",
    dicas: [
      "Defina um limite de tempo diário no LinkedIn.",
      "Siga perfis por propósito e silencie os que só geram ansiedade.",
      "Antes de começar uma certificação, pergunte se ela se encaixa no seu objetivo."
    ]
  },
  {
    max: 50,
    nivel: "Alto",
    classe: "danger",
    descricao: "A vitrine parece pesar bastante na sua percepção de carreira. Lembre que o feed mostra só uma parte da história.",
    dicas: [
      "Faça pausas do feed e foque em projetos práticos que você consiga mostrar.",
      "Converse com colegas, professores ou mentores sobre o que sente.",
      "Se a ansiedade estiver atrapalhando sua rotina, procure apoio de um profissional de saúde."
    ]
  }
];

const lista = document.getElementById("listaPerguntas");
const form = document.getElementById("formTeste");
const resultado = document.getElementById("resultado");
const aviso = document.getElementById("avisoIncompleto");
const barra = document.getElementById("barraProgresso");
const barraWrapper = document.getElementById("barraWrapper");
const textoProgresso = document.getElementById("textoProgresso");

const rotulos = ["1", "2", "3", "4", "5"];

// Gera as perguntas
function montarPerguntas() {
  lista.innerHTML = "";
  perguntas.forEach((texto, i) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "mb-4 p-3 border rounded";

    const legend = document.createElement("legend");
    legend.className = "fs-6 fw-semibold float-none w-auto px-2";
    legend.textContent = `${i + 1}. ${texto}`;
    fieldset.appendChild(legend);

    const grupo = document.createElement("div");
    grupo.className = "d-flex flex-wrap gap-3 align-items-center";

    const inicio = document.createElement("span");
    inicio.className = "small text-body-secondary";
    inicio.textContent = "Discordo";
    grupo.appendChild(inicio);

    rotulos.forEach((valor) => {
      const wrap = document.createElement("div");
      wrap.className = "form-check form-check-inline m-0";
      const id = `p${i}_${valor}`;
      wrap.innerHTML = `
        <input class="form-check-input" type="radio" name="p${i}" id="${id}" value="${valor}">
        <label class="form-check-label" for="${id}">${valor}</label>`;
      grupo.appendChild(wrap);
    });

    const fim = document.createElement("span");
    fim.className = "small text-body-secondary";
    fim.textContent = "Concordo";
    grupo.appendChild(fim);

    fieldset.appendChild(grupo);
    lista.appendChild(fieldset);
  });
}


function atualizarProgresso() {
  let respondidas = 0;
  perguntas.forEach((_, i) => {
    if (form.querySelector(`input[name="p${i}"]:checked`)) respondidas++;
  });
  const pct = Math.round((respondidas / perguntas.length) * 100);
  barra.style.width = pct + "%";
  barraWrapper.setAttribute("aria-valuenow", pct);
  textoProgresso.textContent = `${respondidas} de ${perguntas.length} respondidas`;
  return respondidas;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const respondidas = atualizarProgresso();

  if (respondidas < perguntas.length) {
    aviso.classList.remove("d-none");
    return;
  }
  aviso.classList.add("d-none");

  let total = 0;
  perguntas.forEach((_, i) => {
    total += Number(form.querySelector(`input[name="p${i}"]:checked`).value);
  });

  const faixa = faixas.find((f) => total <= f.max);

  resultado.innerHTML = `
    <div class="card border-${faixa.classe}">
      <div class="card-body">
        <h3 class="h5">Pontuação: ${total} de 50
          <span class="badge text-bg-${faixa.classe}">${faixa.nivel}</span>
        </h3>
        <p>${faixa.descricao}</p>
        <h4 class="h6">Recomendações</h4>
        <ul>${faixa.dicas.map((d) => `<li>${d}</li>`).join("")}</ul>
        <p class="small text-body-secondary mb-0">Não é diagnóstico. Este teste serve apenas para reflexão.</p>
      </div>
    </div>`;
});


document.getElementById("btnRefazer").addEventListener("click", () => {
  form.reset();
  aviso.classList.add("d-none");
  atualizarProgresso();
  resultado.innerHTML = '<p class="text-body-secondary">O resultado aparece aqui depois que você responder todas as afirmações.</p>';
  window.scrollTo({ top: 0, behavior: "smooth" });
});

form.addEventListener("change", atualizarProgresso);

montarPerguntas();
atualizarProgresso();