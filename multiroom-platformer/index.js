const bgAudio = new Audio('./sound/bg.mp3')
const jumpAudio = new Audio('./sound/jump.mp3')
const doorAudio = new Audio('./sound/door.mp3')
const walkDoorAudio = new Audio('./sound/walkDoor.mp3')

bgAudio.volume = 0.25;
document.body.addEventListener("keydown", function () {
    bgAudio.play()
})

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16 // 1024
canvas.height =  64 * 9 // 576

let parsedCollisions
let collisionBlocks
let backgroundLevel
let doors

const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if(level >= 4){
                            level = 1
                        }
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})

let level = 1
let levels = {
    // LEVEL 1
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks

            doorAudio.pause()
            doorAudio.currentTime = 0
            walkDoorAudio.pause()
            walkDoorAudio.currentTime = 0

            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },

    // LEVEL 2
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            doorAudio.pause()
            doorAudio.currentTime = 0
            walkDoorAudio.pause()
            walkDoorAudio.currentTime = 0

            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },

    // LEVEL 3
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks
            player.position.x = 700
            player.position.y = 230

            doorAudio.pause()
            doorAudio.currentTime = 0
            walkDoorAudio.pause()
            walkDoorAudio.currentTime = 0

            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 175,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
}

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

const overlay = {
    opacity: 0
} 

function animate(){
    window.requestAnimationFrame(animate)
    backgroundLevel.draw()
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = '#3f3851'
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore()

}

levels[level].init()
animate()