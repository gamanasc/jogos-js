window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            if(player.velocity.y == 0)
            player.velocity.y = -20
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