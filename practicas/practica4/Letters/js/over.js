B_COLOR = "#FA0"

var capguy;
var capguy2;

let overState = {
    preload: preloadOver,
    create: createOver,
    update: updateOver
};

function preloadOver () {
    game.load.atlasJSONHash('cityscene', '../assets/atlas/cityscene.png', '../assets/textureAtlas/cityscene.json');
}

function createOver() {
    game.stage.backgroundColor = B_COLOR;
    scoreText = game.add.text(
        15, // x
        logoImg.y + logoImg.height, // y
        'Game complete!\nYou got ' + HITS_MIN + ' hits\nClick to play again', // text
        {fontSize: '32px', fill: '#0AF'});

    scoreText.inputEnabled = true;

    scoreText.events.onInputDown.add(restartGame);

    capguy = game.add.sprite(0, 180, 'cityscene', 'capguy/walk/0001');
	capguy.scale.setTo(0.5,0.5);

	capguy.animations.add('walk', Phaser.Animation.generateFrameNames('capguy/walk/', 1, 8, '', 4), 10, true, false);
	capguy.animations.play('walk');

    capguy2 = game.add.sprite(0, 180, 'cityscene', 'capguy/walk/0001');
	capguy2.scale.setTo(-0.5,0.5);

	capguy2.animations.add('walk', Phaser.Animation.generateFrameNames('capguy/walk/', 1, 8, '', 4), 10, true, false);
	capguy2.animations.play('walk');
    capguy2.x = game.height;

};

function restartGame(){
    game.state.start('main');
};

function updateOver(){
    capguy.animations.currentAnim.speed++;
    if (capguy.animations.currentAnim.speed==10){
        capguy.animations.currentAnim.speed = 0;
    }
}