let valorInicial = document.querySelector('#comeca');
let valorFinal = document.querySelector('#termina');
let comeca = 0;
let termina = 100;
let textoComeca = document.querySelector('.texto__comeca');
let textoTermina = document.querySelector('.texto__termina');
let numeroAleatorio;

let avisoErroComeca = [];
let avisoErroTermina = [];

valorInicial.addEventListener('change', alterandoValorInicial);
valorFinal.addEventListener('change', alterandoValorFinal);

// caso o usuario set um valor inicial, ira mudar o texto e adiciona esse valor
function alterandoValorInicial(){
  const span = criandoAviso('O valor inicial não pode ser maior que o final.');
  valorInicial.value = Math.ceil(valorInicial.value);
  if(+valorInicial.value > termina){
    if(avisoErroComeca.length === 0 ){
      valorInicial.parentElement.appendChild(span);
      avisoErroComeca.push(span);
      return
    }
  }else {
    avisoErroComeca.pop();
    valorInicial.parentNode.lastChild.remove();
    comeca = +valorInicial.value;  
    textoComeca.innerText = comeca;gerandoNumeroAleatorio(comeca, termina);
  }
}
// caso o usuario set um valor final, ira mudar o texto e adiciona esse valor
function alterandoValorFinal(){
  const spanValorMax = criandoAviso('O valor maximo é 1000');
  const spanValorPequeno = criandoAviso('O valor final deve ser maior que o inicial');

  valorFinal.value = Math.ceil(valorFinal.value);
  if(+valorFinal.value > 1000){
    if(avisoErroTermina.length === 0){
      avisoErroTermina.push(0);
      valorFinal.parentNode.appendChild(spanValorMax);
    }
  }else if(+valorFinal.value < comeca){
    if(avisoErroTermina.length === 0){
      avisoErroTermina.push(0);
      valorFinal.parentNode.appendChild(spanValorPequeno);
    }else if(avisoErroTermina.length === 1){
      avisoErroTermina.pop();
      avisoErroTermina.push(0);
      valorFinal.parentNode.appendChild(spanValorPequeno);
    }
  }else {
    avisoErroTermina.pop();
    valorFinal.parentNode.lastChild.remove();
    termina = +valorFinal.value;
    textoTermina.innerText = termina;
    numeroAleatorio = gerandoNumeroAleatorio(comeca, termina);
  }
}

function criandoAviso(texto){
  const span = document.createElement('span');
  span.classList.add('aviso');
  span.innerText = texto;
  return span
}
// Gera um número aleatorio
function gerandoNumeroAleatorio(min, max){
  return Math.ceil(Math.random() * (max - min) + min);
}

const botao = document.querySelector('button');
const numeroChutado = document.querySelector('#numero');
const dica = document.querySelector('.dica span');

botao.addEventListener('click', chutandoNumero);
// Informa quando o usuario acertar, e dar dica 
numeroAleatorio = gerandoNumeroAleatorio(comeca, termina);
function chutandoNumero(){
  if(+numeroChutado.value === numeroAleatorio){
    dica.innerText = 'Parabéns você ganhou!';
    return
  }else {
    if(+numeroChutado.value < numeroAleatorio){
      dica.innerText = 'Chute um número mais alto';
      return
    }else {
      dica.innerText = 'Chute um número mais baixo';
      return
    }
  }
}

const resetar = document.querySelector('a');
resetar.addEventListener('click', resetaJogo);
const inputs = [...document.querySelectorAll('input')];
// reseta o jogo, mantendo o valor inicial e final
function resetaJogo(event){
  event.preventDefault();
  numeroAleatorio = gerandoNumeroAleatorio(comeca, termina);
  dica.innerText = 'Chute um número';
  inputs.forEach(item => item.value = '');
}
