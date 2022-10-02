const elementoCelula = document.querySelectorAll("[data-celula]");
const tab = document.querySelector("[data-tab]");
const mensagemVitoriaTextElement = document.querySelector(
  "[data-mensagem-vitoria-texto]"
);
const mensagemVitoria = document.querySelector("[data-mensagem-vitoria]");
const reiniciarBotao = document.querySelector("[data-reiniciar-botao]");

let vezCirculo;

const combinacoesVitoriosas = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const comecarJogo = () => {
  vezCirculo = false;

  for (const celula of elementoCelula) {
    celula.classList.remove("circulo");
    celula.classList.remove("x");
    celula.removeEventListener("click", handleClick);
    celula.addEventListener("click", handleClick, { once: true });
  }

  setHoverTab();
  mensagemVitoria.classList.remove("mostrar-mensagem-vitoria");
};

const endGame = (empate) => {
  if (empate) {
    mensagemVitoriaTextElement.innerText = "Deu velha";
  } else {
    mensagemVitoriaTextElement.innerText = vezCirculo
      ? "⬤ venceu"
      : "X venceu";
  }

  mensagemVitoria.classList.add("mostrar-mensagem-vitoria");
};

const verificarVitoria = (currentPlayer) => {
  return combinacoesVitoriosas.some((combination) => {
    return combination.every((index) => {
      return elementoCelula[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...elementoCelula].every((celula) => {
    return celula.classList.contains("x") || celula.classList.contains("circulo");
  });
};

const placeMark = (celula, classToAdd) => {
  celula.classList.add(classToAdd);
};

const setHoverTab = () => {
  tab.classList.remove("circulo");
  tab.classList.remove("x");

  if (vezCirculo) {
    tab.classList.add("circulo");
  } else {
    tab.classList.add("x");
  }
};

const trocarTurno = () => {
  vezCirculo = !vezCirculo;

  setHoverTab();
};

const handleClick = (e) => {
  // colocar x ou ⬤
  const celula = e.target;
  const classToAdd = vezCirculo ? "circulo" : "x";

  placeMark(celula, classToAdd);

  // verificar vitoria
  const vitoria = verificarVitoria(classToAdd);

  // verificar empate
  const empate = checkForDraw();

  if (vitoria) {
    endGame(false);
  } else if (empate) {
    endGame(true);
  } else {
    // trocar simbolo
    trocarTurno();
  }
};

comecarJogo();

reiniciarBotao.addEventListener("click", comecarJogo);