window.addEventListener('keydown', (event) => {

    if(player.preventInput) return

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            for(const element of doors) {
                const door = element
                // VERIFICA SE O JOGADOR ESTÁ NO MEIO DA PORTA (CHECANDO O LADO DIREITO DE AMBOS, OU ESQUERDO)
                if(
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width && // ESQUERDA
                    player.hitbox.position.x >= door.position.x && // DIREITA
                    player.hitbox.position.y + player.hitbox.height >= door.position.y && // TOPO
                    player.hitbox.position.y <= door.position.y + door.height // FUNDO
                ){
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                    return
                }
            }
            if(player.velocity.y == 0) player.velocity.y = -20
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = true
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = false
            break;
    }
})