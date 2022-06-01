const PROYECTIL_VELOCITY = 200;
const PROYECTIL_OFFSET_Y = -10;

function createCarrito() {
    let x = game.world.centerX;
    let y = game.world.height - HUD_HEIGHT;
    carrito = game.add.sprite(x, y, 'carrito');
    
    carrito.scale.setTo(0.3);
    carrito.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(carrito);
    //carrito.body.collideWorldBounds = true;
}

function createProyectiles() {
    proyectiles = game.add.group();
    proyectiles.enableBody = true;
    
    proyectiles.callAll('events.onOutOfBounds.add','events.onOutOfBounds', resetMember);
    proyectiles.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    proyectiles.setAll('checkWorldBounds', true);
}

function fireProyectil(producto) {
    
    let proyectil = proyectiles.add(game.add.sprite(carrito.x,carrito.y + PROYECTIL_OFFSET_Y));
    moveTo(proyectil,producto,PROYECTIL_VELOCITY);

    if (proyectil)
        soundBilletes.play();
}

function proyectilHitsProducto(proyectil){
    proyectil.kill();
}

function createSounds() {
    soundBilletes = game.add.audio('sndbilletes');
    soundComprado = game.add.audio('sndcomprado');
}