/*class OWP{
    constructor(image, carrito, game, size){
        this.image = image;
        this.productos = game.add.group();
        this.productos.inputEnableChildren = true;
        this.productos.enableBody = true;
        this.productos.createMultiple(size, this.image);

        this.productos.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetMember);
        this.productos.callAll('anchor.setTo', 'anchor',0.5,1.0);
        this.productos.setAll('checkWorldBounds', true);
        game.time.events.loop( TIMER_RHYTHM, this.activateProducto, this);

        //game.physics.arcade.moveToObject(this.image, carrito, 200);
    }

    resetMember(item) {
        item.kill();
    }

    activateProducto() {
        if (Math.random() < currentProductoProbability) {
            let producto = productos.getFirstExists(false);
            if (producto) {
                let gw = game.world.width;
                let uw = producto.body.width;
                let w = gw - uw;
                let x = Math.floor(Math.random()*w);
                let z = uw / 2 + x;
                producto.reset(z, 0);
            }
        }
    }
};*/

function createLetters(){
    letters = game.add.group();
    letters.inputEnableChildren = true;
    elegida = false;
}

function createProductos(probability) {
    productos = game.add.group();
    productos.scale.setTo(0.1);
    productos.enableBody = true;

    productos.callAll('events.onOutOfBounds.add',
        'events.onOutOfBounds', resetMember);
    productos.callAll('anchor.setTo', 'anchor',0.5,0.5);
    productos.setAll('checkWorldBounds', true);
    currentProductoProbability = probability;
    game.time.events.loop(
        TIMER_RHYTHM, activateProducto, this);
}

function UpdateWords(){
    
    for (let i = 0; i < letters.children.length; i++){
        letters.children[i].x = productos.children[i].x / 10;
        letters.children[i].y = productos.children[i].y / 10;
    }
}

function activateProducto() {
    if (Math.random() < currentProductoProbability) {
        let producto = productos.add(game.add.sprite(getRandomInt(GAME_STAGE_WIDTH*10),0,'verdura'));
        moveTo(producto,carrito,PARTEA_PRODUCTO_VELOCITY);
        createWords(producto);
        
    }
}

function randomWord()
{
    let i = getRandomInt(totalWords.length);
    let j = getRandomInt(totalWords[i].length);
    let res = totalWords[i][j];
    let continuar = true;
    while(continuar){
        continuar = false;
        for(let k = 0; k < letters.children.length; k++){
            if (res[0] == letters.children[k].text[0]){
                i = getRandomInt(totalWords.length);
                j = getRandomInt(totalWords[i].length);
                res = totalWords[i][j];
                continuar = true;
                break;
            }
        }
    }
    return res;
}

function createWords(producto) {
    
    let a = game.add.text(producto.x,
        producto.y, randomWord(),
        {fontSize: '40px', fill: '#FA2'},
        letters);
        //a.anchor.setTo(0.5, 0.5);
};