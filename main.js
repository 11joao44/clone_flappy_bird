const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < canvas.width; i += planoDeFundo.largura) {

            contexto.drawImage(
                sprites,
                planoDeFundo.spriteX,
                planoDeFundo.spriteY,
                planoDeFundo.largura,
                planoDeFundo.altura,
                planoDeFundo.x + i,
                planoDeFundo.y,
                planoDeFundo.largura,
                planoDeFundo.altura,
            );
        }
    },
};

const chao = {
    spritesX: 0,
    spritesY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        for (let i = 0; i < canvas.width; i += chao.largura) {
            contexto.drawImage(
                sprites,
                chao.spritesX,
                chao.spritesY,
                chao.largura,
                chao.altura,
                chao.x + i,
                chao.y,
                chao.largura,
                chao.altura
            );
        }
    }
};

function colisao(bird, chao) {
    const birdY = bird.y + bird.altura
    const chaoY = chao.y

    if (birdY >= chaoY) {
        return true
    } else {
        return false
    }
}


function criarBird() {
    const bird = {
        spritesX: 0,
        spritesY: 0,
        largura: 33,
        altura: 24,
        x: 10, 
        y: 180,
        jump: 4.6,
    
        jumper() {
            bird.velocidade = - bird.jump;
        },
    
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza() {
            if(colisao(bird, chao)) {
                som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(Telas.incio);
                }, 500)
                return;
            }
    
            bird.velocidade = bird.velocidade + bird.gravidade
            bird.y = bird.y + bird.velocidade
        },
    
        desenha() {
            contexto.drawImage(
                sprites, // A imagem base
                bird.spritesX, bird.spritesY, // Sprite X, Sprite Y do objeto desejado
                bird.largura, bird.altura, // Tamanho do recorte do objeto = larguraX=33/alturaY=24 
                bird.x, bird.y, // Onde deseja posicionar o objeto dentro do canvas
                bird.largura, bird.altura,
            );
        }
    }
    return bird;
}


const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 250,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX,
            mensagemGetReady.sY,
            mensagemGetReady.w,
            mensagemGetReady.h,
            mensagemGetReady.x,
            mensagemGetReady.y,
            mensagemGetReady.w,
            mensagemGetReady.h,
        )
    }
}

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTele) {
    telaAtiva = novaTele;

    if(telaAtiva.inicaliza) {
       telaAtiva.inicaliza();
    }
}

const Telas = {

    incio: {
        inicaliza() {
            globais.bird = criarBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.bird.desenha();
            mensagemGetReady.desenha();
        },

        click() {
            mudaParaTela(Telas.JOGO)
        },

        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.bird.desenha();
    },
    click() {
        globais.bird.jumper();
    },
    atualiza() {
        globais.bird.atualiza();
    }
}

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.incio)
loop();