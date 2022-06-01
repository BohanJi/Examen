let activeWord_indice;
let productos;
let proyectiles;
let carrito;
let letters;
let background;
let elegida;

let fruitList = 
["orange",
"apple",
"banana",
"kiwi",
"watermelon",
"cherries"];

let vegetablesList = 
["garlic",
"artichoke",
"eggplant",
"broccoli",
"zucchini",
"onion",
"red onion",
"green onion",
"mushroom",
"cauliflower",
"asparagus",
"spinach",
"lettuce",
"corn",
"avocado",
"potato",
"sweet potato",
"cucumber"];

let brickList = 
["milk",
"apple juice",
"soy milk",
"orange juice",
"peach juice",
"almond milk"];

let bottleList = 
["water",
"soda",
"beer",
"oil",
"ketchup",
"mustard",
"liquor",
"hot sauce",	
"vinegar",
"whisky",
"vodka",
"gin",
"tomato sauce"];

let currentProductoProbability;

let totalWords = [fruitList, vegetablesList, brickList, bottleList];

/*function carritoRender(){
    let x = abs(carrito.x + activeWord.x);
    let y = abs(carrito.y + activeWord.y);
    let angle = Math.atan2(y,x);
    if (angle > 10){
        angle = 10;
    }
    else if(angle < -10){
        angle = -10;
    }
    carrito.setAngle(angle);
}*/

function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
}

function resetMember(item) {
    item.kill();
}

function createWorld(){
    let w = game.world.width;
    let h = game.world.height;
    background = game.add.tileSprite(
        0, 0, w, h, 'background');
}

function moveTo(origen,destino,velocity){
    
    origen.body.velocity.y = velocity;

    let dif = destino.x - origen.x;
    if (dif>0) origen.body.velocity.x = (dif) / 8;
    else origen.body.velocity.x = (dif) / 80;
}

