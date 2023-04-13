class Player extends Sprite{
    constructor({
        collisionBlocks = [], imageSrc, frameRate
    }){
        super({imageSrc, frameRate})
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
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // VERIFICA MOVIMENTO HORIZONTAL
        this.position.x += this.velocity.x

        this.checkForHorizontalColiisions();
        this.applyGravity();
        this.checkForVerticalColiisions();
    }

    checkForHorizontalColiisions(){
        // COLISÕES HORIZONTAIS
        for (const element of this.collisionBlocks) {
            const collisionBlock = element
            if(
                this.position.x <= collisionBlock.position.x + collisionBlock.width && // ESQUERDA
                this.position.x + this.width >= collisionBlock.position.x && // DIREITA
                this.position.y + this.height >= collisionBlock.position.y && // TOPO
                this.position.y <= collisionBlock.position.y + collisionBlock.height // FUNDO
            ){
                // COLISÃO HORIZONTAL PARA A ESQUERDA
                if(this.velocity.x < 0){
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }

                // COLISÃO HORIZONTAL PARA A DIREITA
                if(this.velocity.x > 0){
                    this.position.x = collisionBlock.position.x - this.width + 0.01
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
                this.position.x <= collisionBlock.position.x + collisionBlock.width && // ESQUERDA
                this.position.x + this.width >= collisionBlock.position.x && // DIREITA
                this.position.y + this.height >= collisionBlock.position.y && // TOPO
                this.position.y <= collisionBlock.position.y + collisionBlock.height // FUNDO
            ){
                // COLISÃO VERTICAL PARA A ESQUERDA
                if(this.velocity.y < 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }

                // COLISÃO VERTICAL PARA A DIREITA
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }
            }
        }
    }
}