// Agora o front-end chama o back-end: GET /api/clima?cidade=NOME

const formulario = document.querySelector("form.search");
const campoCidade = document.getElementById("q");
const painel = document.querySelector(".panel");
const botao = formulario.querySelector("button");
let consultando = false; 

// Mostra um estado da tela: "inicial", "carregando", "resultado", "e1", "e2" ou "e3".
// Funciona marcando o botao de radio escondido que o CSS ja usa.
function mostrarEstado(nome) {
  painel.dataset.estado = nome;
}

// Escreve os dados nos elementos do resultado.
function preencherResultado(dados) {
  document.getElementById("res-local").textContent = dados.localidade;
  document.getElementById("res-icone").textContent = dados.icone;
  document.getElementById("res-cond").textContent = dados.condicao;
  document.getElementById("res-temp").textContent = dados.temperaturaC + "°C";
  const chuva = dados.chanceChuvaPct === null ? "indisponível" : dados.chanceChuvaPct + "%";
document.getElementById("res-chuva").textContent = chuva;
  document.getElementById("res-sensacao").textContent = dados.sensacaoC + "°C";
}
async function consultarClima(cidade) {
  const url = "/api/clima?cidade=" + encodeURIComponent(cidade);
  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (!resposta.ok) {
    const erro = new Error(dados.mensagem);
    erro.codigo = dados.erro; 
    throw erro;
  }

  return dados;
}

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault(); 

  const cidade = campoCidade.value.trim();

  if (cidade === "") {
    mostrarEstado("e1"); 
    return;
  }

  mostrarEstado("carregando");

  try {
    const dados = await consultarClima(cidade);
    preencherResultado(dados);
    mostrarEstado("resultado");
  } catch (erro) {
    if (erro.codigo === "nao_encontrada") {
      mostrarEstado("e2"); 
    } else {
      mostrarEstado("e3"); 
    }
  }
});