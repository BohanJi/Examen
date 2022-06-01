const GAME_AREA_WIDTH = 400;
const GAME_AREA_HEIGHT = 400;
const BG_COLOR = "#4488AA";
const HITS_MIN = 5; // small for quick debugging


// game instance
let game = new Phaser.Game(GAME_AREA_WIDTH, GAME_AREA_HEIGHT,
    Phaser.CANVAS, "game");

// state's phases
let mainState = {
    preload: preloadAssets,
    create: initGame,
    update: updateGame
};

let scoreText;
let numHits;
let minuet;

// methods for each phase of the state
function preloadAssets() {
    game.load.image("logo", "assets/imgs/uji.png");
    game.load.audio('minuet','../assets/snds/minuet.mp3');
}

function getKeyboardInput(e) {
    if (e.keyCode >= Phaser.Keyboard.A
    && e.keyCode <= Phaser.Keyboard.Z) {
    let a = game.add.text(Math.random() * game.width,
    Math.random() * game.height, e.key,
    {fontSize: '40px', fill: 'FA2'},
    letters); // group to add to
    }
    // relative positions in [0,1]
    a.anchor.setTo(0.5, 0.5); // 0.5 for the center
}

function shakeLetters() {
    for (const child of letters.children) {
    child.x += Math.random() * 2 - 1;
    child.y += Math.random() * 2 - 1;
    child.angle += Math.random() * 10 - 5;
    }
}

function processLetter(item, pointer) {
    item.destroy(); // frees up memory
    // kill() removes it from display list,
    // but not from the group
    numHits++;
}

function checkDistance() {
    const DIST_THRESH = 50;
    if (game.input.activePointer.isDown) {
        let xPointer = game.input.x;
        let yPointer = game.input.y;
    for (const letter of letters.children) {
        let x = (letter.x - xPointer)**2;
        let y = (letter.y - yPointer)**2;
        let d = Math.sqrt(x + y);
        if (d <= DIST_THRESH)
            processLetter(letter);
        }
    }
}

function checkGameOver() {
    if (numHits > HITS_MIN)
        game.state.start('over');

}

function initGame() {
    game.stage.backgroundColor = BG_COLOR;

    logoImg = game.add.image(0, 0, "logo");
    logoImg.scale.setTo(0.2);

    game.input.keyboard.onDownCallback = getKeyboardInput;

    letters = game.add.group();
    letters.inputEnableChildren = true;

    letters.onChildInputDown.add(processLetter);

    game.input.onDown.add(checkDistance);

    numHits = 0;

    scoreText = game.add.text(
        15, // x
        logoImg.y + logoImg.height, // y
        'Hits: '+ numHits, // text
        {fontSize: '32px', fill: '#000'});

    minuet = game.add.audio('minuet');
    minuet.loop = true;
    minuet.play();
}


function moveLogo(){
    logoImg.x += 1;
    if (logoImg.x + logoImg.width > game.width){
        logoImg.x = 0;
    }
}

function updateScore() {
    scoreText.text = 'Hits: ' + numHits;

}

function updateGame() {
    moveLogo();
    shakeLetters();
    game.input.activePointer.isDown;
    updateScore();
    checkGameOver();
}

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('main', mainState);
    game.state.add('over', overState);
    game.state.start('main');
}