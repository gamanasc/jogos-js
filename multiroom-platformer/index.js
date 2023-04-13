const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16 // 1024
canvas.height =  64 * 9 // 576

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player()

const keys = {
    w: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
    a: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
}

function animate(){
    window.requestAnimationFrame(animate)
    backgroundLevel1.draw()

    player.velocity.x = 0

    if(keys.d.pressed || keys.arrowRight.pressed) 
        player.velocity.x = 5
    else if(keys.a.pressed || keys.arrowLeft.pressed) 
        player.velocity.x = -5

    player.draw()
    player.update()

}

animate()