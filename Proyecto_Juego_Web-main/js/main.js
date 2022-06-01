const GAME_STAGE_WIDTH = 550;
const GAME_STAGE_HEIGHT = 700;

let levelConfig;

let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet']
    },

    custom: {
        families: ['FerrumExtracondensed', 'Inspiration'],
        urls: ["https://fontlibrary.org/face/ferrum"]
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage');

    game.state.add('start', startState);
    game.state.add('about', aboutState);

    game.state.add('part-a', partAState);
    game.state.add('part-b', partBState);
    game.state.add('part-c', partCState);

    game.state.add('end_game', endGameState);

    game.state.start('start');
}