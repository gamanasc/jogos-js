class Player extends Sprite{
    constructor({
        collisionBlocks = [], 
        imageSrc, 
        frameRate, 
        animations,
        loop
    }){
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.collisionBlocks = collisionBlocks
    }

    update(){
        // // REFERÊNCIA
        /*
        * c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        * c.fillRect(this.position.x, this.position.y, this.width, this.height) 
        **/

        // VERIFICA MOVIMENTO HORIZONTAL
        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkForHorizontalColiisions()
        this.applyGravity()

        this.updateHitbox()
        
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.checkForVerticalColiisions()
    }

    handleInput(keys){
        if(this.preventInput) return

        this.velocity.x = 0

        if(keys.d.pressed || keys.arrowRight.pressed) {
            this.switchSprite('runRight')
            this.velocity.x = 5
            this.lastDirection = 'right'
        }else if(keys.a.pressed || keys.arrowLeft.pressed) {
            this.switchSprite('runLeft')
            this.velocity.x = -5
            this.lastDirection = 'left'
        }else{
            if(this.lastDirection === 'left' ) this.switchSprite('idleLeft')
            else this.switchSprite('idleRight')
        }
    }

    switchSprite(name){
        if(this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkForHorizontalColiisions(){
        // COLISÕES HORIZONTAIS
        for (const element of this.collisionBlocks) {
            const collisionBlock = element
            if(
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && // ESQUERDA
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x && // DIREITA
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && // TOPO
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height // FUNDO
            ){
                // COLISÃO HORIZONTAL PARA A ESQUERDA
                if(this.velocity.x < 0){
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }

                // COLISÃO HORIZONTAL PARA A DIREITA
                if(this.velocity.x > 0){
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity(){
        // GRAVIDADE
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalColiisions(){
        // COLISÕES VERTICAIS
        for (const element of this.collisionBlocks) {
            const collisionBlock = element
            if(
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && // ESQUERDA
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x && // DIREITA
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && // TOPO
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height // FUNDO
            ){
                // COLISÃO VERTICAL PARA CIMA
                if(this.velocity.y < 0){
                    const offset = this.hitbox.position.y - this.position.y
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

                // COLISÃO VERTICAL PARA BAIXO
                if(this.velocity.y > 0){
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
    }
}