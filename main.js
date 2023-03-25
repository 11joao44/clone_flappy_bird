const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
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
        contexto.drawImage(
            sprites,
            chao.spritesX, chao.spritesY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
    
        contexto.drawImage(
            sprites,
            chao.spritesX, chao.spritesY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    }
}


const bird = {
    spritesX: 0,
    spritesY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
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

function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    bird.desenha();
    bird.atualiza();

    
    requestAnimationFrame(loop)
}

loop();