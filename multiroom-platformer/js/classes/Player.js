class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.position.y + this.height
        }
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){

        this.position.x += this.velocity.x

        // GRAVIDADE
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height
        
        // Verifica constantemente a posição do jogador, e puxa para baixo sempre que o sprite estiver acima da altura do chão
        if(this.sides.bottom + this.velocity.y < canvas.height){
            this.velocity.y += this.gravity
        }else{
            // Se o jogador estiver no chão, a velocidade é resetada, para não atravessar
            this.velocity.y = 0
        }

    }
}