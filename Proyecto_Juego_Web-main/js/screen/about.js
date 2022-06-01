const MENUX = 190,
MENUY = 490;

let aboutState = {
        preload: preloadAboutState,
        create: createAboutState
    };

function preloadAboutState () {
    game.load.image('backAbout','../../assets/imgs/supermercado.jpg');
    game.load.image('buttonInit','../../assets/imgs/button_menu.png');
};

function createAboutState () {
    let bg = game.add.image(0, 0, 'backAbout');
    bg.scale.setTo(1.2,2.2);
    b = game.add.button(MENUX, MENUY, 'buttonInit',
        OnButtonMenuPressed);
    let textTitle ='hola';
    let styleTitle = {
        font: 'bold 18pt Inspiration',
        fill: '#b60404'
    };
    game.add.text(TITLE_X, TITLE_Y, textTitle, styleTitle);
};

function OnButtonMenuPressed() {
    game.state.start('start');
}