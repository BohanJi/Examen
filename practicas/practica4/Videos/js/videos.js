const GAME_AREA_WIDTH = 800;
const GAME_AREA_HEIGHT = 600;
const BG_COLOR = "#FFFFFF";
const GAP = 10;
const x = 200
const y = 540
const gap = 30

let botonPlay,botonStop,video,sprite,botonMute;

// game instance
let game = new Phaser.Game(GAME_AREA_WIDTH, GAME_AREA_HEIGHT,
    Phaser.CANVAS, "game");

// state's phases
let mainState = {
    preload: preloadAssets,
    create: initGame,
    update: updateGame
};


// methods for each phase of the state
function preloadAssets() {
    game.load.image("stop","../assets/imgs/button_stop.png");
    game.load.image("play","../assets/imgs/button_play.png");
    game.load.video('pass','../assets/videos/pass-countdown.ogg');
    game.load.image('mute','../assets/imgs/button_mute.png');
}

function playButtom(){
    if(botonPlay.visible){
        botonPlay.visible = false;
        botonStop.visible = true;
        video.stop();
    }
    else {
        botonPlay.visible = true;
        botonStop.visible = false;
        video.play();
    }
}

function initGame() {
    botonStop = game.add.button(x, y, "stop", playButtom, this,2,1,0);
    botonPlay = game.add.button(x, y, "play", playButtom, this,2,1,0);
    botonMute = game.add.button(
        botonPlay.x+botonPlay.width+gap, // x
        botonPlay.y, // y
        'mute', // image key
        muteVideo); // handler

    botonStop.visible = false;

    video = game.add.video('pass');

    sprite = video.addToWorld(400,250,0.5,0.5);

    video.play();

}

function muteVideo(){
    if(game.sound.mute)
    {
        game.sound.mute = false;
        botonStop.alpha = 0.3
    }
    else {
        game.sound.mute = true;
    }
}

function updateGame() {

}

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('main', mainState);
    game.state.start('main');
}

