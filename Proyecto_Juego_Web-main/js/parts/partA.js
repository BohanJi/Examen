const HUD_HEIGHT = 80;
const TIMER_RHYTHM=0.1*Phaser.Timer.SECOND;
const PRODUCTOS_GROUP_SIZE = 200;
const PARTEA_PRODUCTO_VELOCITY = 200;
const PARTEA_PRODUCTO_PROBABILITY = 0.02;
const maxWorldCount = 5;
let pos;
//let tiempo = 0;

let partAState = {
    preload: preloadPartAState,
    create: createPartAState,
    update: updatePartAState
};

function preloadPartAState () {
    game.load.image('background',
        'assets/imgs/supermercado.jpg');

    game.load.image('carrito',
        'assets/imgs/carrito.png');

    game.load.image('fruta',
        'assets/imgs/fruta.png');

    game.load.image('botella',
        'assets/imgs/botella.png');

    game.load.image('brick',
        'assets/imgs/brick.png');

    game.load.image('verdura',
        'assets/imgs/verdura.png');
    
    game.load.image('proyectil',
        '../../assets/imgs/proyectil.jpeg');

    game.load.audio('sndbilletes', '../../assets/snds/billetes.wav');
    game.load.audio('sndcomprado', '../../assets/snds/comprado.wav');
};

function createPartAState () {
    
    createWorld();
    
    createCarrito();
    createProductos(PARTEA_PRODUCTO_PROBABILITY);
    createHUD();
    createLetters();
    createSounds();
    createProyectiles();
    
    

    game.input.keyboard.onDownCallback = chooseWord;
    
    pos = undefined;
    
};

function updatePartAState () {
    background.tilePosition.y += 1;
    //tiempo+=1;

    UpdateWords();
};


function chooseWord(e = KeyboardEvent)
{
    let l = e.key;
    if (elegida)
    {
        let word = letters.children[pos];

        if (l == word.text[0])
        {
            fireProyectil(productos.children[pos]);
             word.text = word.text.slice(1, word.length);
             if (word.text == '')
            {
                productos.children[pos].kill();
                letters.children[pos].kill();
                elegida = false;
                pos = undefined;
            }
        }
        letters.children[pos] = word;
    }

    else {
        for (let i = 0; i < letters.children.length; i++)
        {
            if (l == letters.children[i].text[0])
            {
                fireProyectil(productos.children[i]);
                let word = letters.children[i];
                letters.children[i].addColor('#e6e6e6',0);
                elegida = true;
                word.text = word.text.slice(1,word.length);
                pos = i;
            }
        }
    } 
}
    

