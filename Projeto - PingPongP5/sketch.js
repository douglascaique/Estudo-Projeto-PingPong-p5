// variáveis de dimensões x y e diametro da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar ddo jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let trilha;
let raquetada;
let ponto;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    colisaoRaqueteLib(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    colisaoRaqueteLib(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
}

// funcoes
function mostraBolinha() {
    //criar bolinha
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    //movimento bolinha
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    //Condições de movimento para bolinha não passar da borda
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
    //limitar movimentação para dentro do cenario
    yRaquete = constrain(yRaquete, 10, 310);
}

function verificaColisaoRaquete() {
    if (
        xBolinha - raio < xRaquete + raqueteComprimento &&
        yBolinha - raio < yRaquete + raqueteAltura &&
        yBolinha + raio > yRaquete
    ) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function colisaoRaqueteLib(x, y) {
    colidiu = collideRectCircle(
        x,
        y,
        raqueteComprimento,
        raqueteAltura,
        xBolinha,
        yBolinha,
        raio
    );
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

//raquete do oponente Computador
function movimentaRaqueteOponente() {
    velocidadeYOponente =
        yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 85;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();

    //limitar movimentação para dentro do cenario
    yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

//chance de errar
function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
        chanceDeErrar += 1;
        if (chanceDeErrar >= 39) {
            chanceDeErrar = 40;
        }
    } else {
        chanceDeErrar -= 1;
        if (chanceDeErrar <= 35) {
            chanceDeErrar = 35;
        }
    }
}

//raquete oponente multiplayer
// function movimentaRaqueteOponenteMultiplayer(){
//  keycode.info
//  if (keyIsDown(87)){
//    yRaqueteOponente -= 10;
//  }
//   if (keyIsDown(83)){
//    yRaqueteOponente += 10;
//
//limitar movimentação para dentro do cenario
//   yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
// }
// }

//placar
function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(255, 140, 0);
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(255, 140, 0);
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

//resolvendo bugs

function bolinhaNaoFicaPresa() {
    if (xBolinha - raio < 0) {
        xBolinha = 23;
    }
}
