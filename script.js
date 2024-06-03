// Quero que você crie um jogo simples do tipo adivinhe um número. Ele deve gerar um número aleatório de 1 a 100, 
// depois desafiar o jogador a adivinhar o número em 10 rodadas. A cada rodada deve ser dito ao jogador se ele está
//  certo ou errado, se estiver errado, deve ser dito se o palpite é muito baixo ou muito alto. Também deve ser mostrado 
//  ao jogador os números que ele tentou adivinhar anteriormente. O jogo termina se o jogador acertar o número ou acabarem
//   o número de tentativas. Quando o jogo acabar, deve ser dado ao jogador a opção de jogar novamente.

let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 0;
let chutes = [];
let chancesRestantes = 10;

exibirMensagemInicial();

function exibirMensagemInicial(){
    exibirNaTela('#container_palpites', 'Digite um palpite entre 0 e 100');
    exibirNaTela('#container_chances', `Você tem ${chancesRestantes} chances! :)`);
}

document.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        const btn = this.querySelector('button');
        btn.click();
    }
})

function gerarNumeroAleatorio(){
    return parseInt(Math.random() * 101 + 1);
}

function exibirNaTela(tag, informacao){
    let campo = document.querySelector(tag);
    campo.innerHTML = informacao;
    //alert('O jogo está sendo reiniciado')
}

function coletarInformacoes(tag){
    let campo = document.querySelector(tag).value;
    return campo;
}

function limparCampo(){
    let campo = document.querySelector('input');
    //essa linha redefine o campo de texto
    campo.value = '';
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 0;
    chancesRestantes = 10;
    chutes = [];
    exibirMensagemInicial();
   // alert('O jogo está sendo reiniciado')
    document.getElementById('reiniciar').setAttribute('disabled', true);
    limparCampo();
    exibirNaTela('#numeros_tentados', '');
    document.getElementById('chute_dado').removeAttribute('disabled');
    document.getElementById('numero').removeAttribute('disabled');

    //esta linha habilita um atributo no elemento botão
}

function exibirResultados(){
    exibirNaTela('#container_palpites', '');
    exibirNaTela('#container_chances', '');
    exibirNaTela('#text__dicas', '');
}

function verificarChute(){
    let chute = (coletarInformacoes('#numero'));
    //primeiro verifica se ainda tem chances, se o array já não está lotado
    //depois verifica os erros
    if(tentativas < 10){
        if(chute && chute > 0 && chute <= 100){
            chancesRestantes--;
            tentativas ++;
            chutes.push(chute);
            exibirNaTela('#numeros_tentados', `Números tentados: ${chutes}`);
                if(chute == numeroAleatorio){
                    document.getElementById('reiniciar').removeAttribute('disabled');
                    let mensagemTentativa = chancesRestantes == 10? 'tentativa' : 'tentativas';
                    exibirNaTela('#container_palpites', `Você acertou com ${tentativas} ${mensagemTentativa} :)`);
                    exibirNaTela('#container_chances', 'Clique em reiniciar para começar um novo jogo!');
                    exibirNaTela('#text__dicas', '');
                    document.getElementById('numero').setAttribute('disabled', true);
                    document.getElementById('chute_dado').setAttribute('disabled', true);
                }else{
                    if(chancesRestantes != 0){
                        if(chute > numeroAleatorio){
                            exibirNaTela('#text__dicas', `O número aleatório é menor que ${chute}`)
                        }else{
                            exibirNaTela('#text__dicas', `O número aleatório é maior que ${chute}`)
                        }
                        chancesRestantes == 1 ? exibirNaTela('#container_chances', `Sua última chance (°-°)`) : exibirNaTela('#container_chances', `Você tem ${chancesRestantes} chances! :)`);
                    }else{
                        exibirNaTela('#container_chances', '');
                    }  
                    limparCampo();
                }
        }else{
            alert('Preencha o campo com um valor válido!');
            limparCampo();
        } 
    }else{
        if(chute == numeroAleatorio){
            exibirNaTela('#container_palpites', `Você acertou com ${tentativas} ${mensagemTentativa} :)`);
        }else{
            exibirNaTela('#container_palpites', `O número secreto era ${numeroAleatorio} Não foi dessa vez :(`);
            limparCampo();
        } 
        exibirNaTela('#container_chances', 'Clique em reiniciar para começar um novo jogo!');
        exibirNaTela('#text__dicas', '');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('numero').setAttribute('disabled', true);
        document.getElementById('chute_dado').setAttribute('disabled', true);
    }
}

//não posso apagar os elementos da página html se eu for utilizá-las sem reiniciar todo o arquivo html
