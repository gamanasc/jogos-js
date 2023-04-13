
// FUNÇÃO PARA SEPARAR DATA DE COLISÃO (do tilemap editor) EM LINHAS DE ARRAY
Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=16) {
        rows.push(this.slice(i, i+16))
    }

    return rows
}

// FUNÇÃO PARA GERAR UM OBJETO DE COLISÃO SEMPRE QUE HOUVER UM INDICATIVO, 
// EM ALGUMA COLUNA DE LINHA DO ARRAY (EXPORTADO NA FUNÇÃO ACIMA)
Array.prototype.createObjectsFrom2D = function(){
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if(symbol == 292){
                objects.push(new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                }))
            }
        })
    });

    return objects
}