//Lista de numeros sorteados
let listaDeNumerosSorteados = [];

//Variavel criada para determinar o limite de numeros que deverão ser sorteados e guardados na lista
let numeroLimite = 10;

//Uma variável recebendo uma função
let numeroSecreto = gerarNumeroAleatorio(); 

//Variável que vai guardar o número de tentativas usadas
let tentativas = 1

//Essa função com parâmetro é responsável em exibir os textos na tela 
function exbirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Código para ativar a responsividade de voz
}

mensagemInicial() // Chamando a função 

//Essa função faz a veriifcação do chutes e contabiliza o numero de chutes.
function verificarChute(){
    let chute = document.querySelector('.container__input').value; // Value é usado para pegar o valor do elemento.
    if (chute == numeroSecreto) {
        exbirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exbirTextoNaTela('.texto__paragrafo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exbirTextoNaTela('.texto__paragrafo', 'O número secreto é menor');
        }else{
            exbirTextoNaTela('.texto__paragrafo', 'O número secreto é maior');
        }
        tentativas++
        limparCampo();
    }
    
}

//Essa função gera o número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

     if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
     }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ // O includes é uma função que veriifca se um determinado valor já foi inserido.
        return gerarNumeroAleatorio() // Recursão
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido) //O push adiciona item ao final da lista
        return numeroEscolhido;
    }
}

//Essa função limpa os campo após cada chute
function limparCampo(){
    chute = document.querySelector('input')
    chute.value = '';
}

//Quando o botão novo jogo é clicado essa função reinicia o jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Esse código desabilita novamente o botão novo jogo.
}

//Essa função apresenta as mensagens iniciais na tela
function mensagemInicial() {
    exbirTextoNaTela('h1', 'Descubra o número Secreto'); 
    exbirTextoNaTela('.texto__paragrafo', 'Escolha um número entre 1 e 10');
}