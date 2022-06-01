const TITLE_X = 200,
      TITLE_Y = 150,
      BUTTON_X = 190,
      BUTTON_ABOUT_Y = 250,
      BUTTON_PART_A_Y = 330,
      BUTTON_PART_B_Y = 410,
      BUTTON_PART_C_Y = 490


let startState = {
    preload: preloadStartState,
    create: createStartState
};

function preloadStartState () {
    game.load.image('button_about', '../../assets/imgs/button_about.png');
    game.load.image('button_part-a','../../assets/imgs/button_part-a.png');
    game.load.image('button_part-b','../../assets/imgs/button_part-b.png');
    game.load.image('button_part-c','../../assets/imgs/button_part-c.png')
};

function createStartState () {
    let textTitle = 'ZTYPE';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '30pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(TITLE_X, TITLE_Y, textTitle, styleTitle);

    AddButtonMenu();
};

function AddButtonMenu () {
    buttonAbout = game.add.button(BUTTON_X, BUTTON_ABOUT_Y, 'button_about', StartAbout, this, 2,1,0);
    buttonA = game.add.button(BUTTON_X, BUTTON_PART_A_Y, 'button_part-a',
        OnButtonAPressed);
    buttonB = game.add.button(BUTTON_X, BUTTON_PART_B_Y, 'button_part-b',
        OnButtonBPressed);
    buttonC = game.add.button(BUTTON_X, BUTTON_PART_C_Y, 'button_part-c',
        OnButtonCPressed);
};

function StartAbout () {
    game.state.start('about');
}

function OnButtonAPressed() {
    game.state.start('part-a');
}

function OnButtonBPressed() {
    game.state.start('part-b');
}

function OnButtonCPressed() {
    game.state.start('part-c');
}