class Weapon {
    constructor(x) {
        this.image = x;
        let s = this.image.style.left;
        this.left = parseInt(s.slice(0,-2));
        s = this.image.style.fontSize;
        this.width = parseInt(s.slice(0,-2));
    };
    move(n) {
        this.left += n;
        this.image.style.left = this.left + "px";
    };
};

let colors = ["cyan","green","gray","blue"];
let cIndex = 0;

class Clash {
    constructor(shield, mjolnir, timer){
        this.shield=shield;
        this.mjolnir=mjolnir;
        this.timer=timer;
    };

    changeBackgroungColor = function () {
        const LEAP = 7;
        const LONG_PERIOD = 20;
        const SHORT_PERIOD = 1;
        let period;
        let sh = this.shield, mj = this.mjolnir;
        if (sh.left + 2 * sh.width > mj.left)
            period = SHORT_PERIOD;
        else
            period = LONG_PERIOD;
        if (sh.left % period === period - 1) {
            cIndex = (cIndex + LEAP) % colors.length;
            let bg = document.getElementById("battlefield");
            bg.style.backgroundColor = colors[cIndex];
        }
    };

    advanceWeapons = function () {
        const SHIELD_MOVE = 1;
        const MJOLNIR_MOVE = -2;
        this.shield.move(SHIELD_MOVE);
        this.mjolnir.move(MJOLNIR_MOVE);
        let sh = this.shield, mj = this.mjolnir;
        if (sh.left + sh.width / 2 > mj.left)
            clearInterval(this.timer);
    };

    animate = function () {
        this.advanceWeapons();
        this.changeBackgroungColor();
    };

    initWeapons = function () {
        let sh = document.getElementById("capshield");
        this.shield = new Weapon(sh);
        let mj = document.getElementById("mjolnir");
        this.mjolnir = new Weapon(mj);
    };
};

function initBackground() {
    for (let i = 0 ; i < colors.length ; i += 3) {
        colors.splice(i,0,"light"+colors[i]);
        colors.splice(i+2,0,"dark"+colors[i+1]);
    }// colors === ["lightcyan","cyan","darkcyan","lightgreen","green","darkgreen"...
    let bg=document.getElementById("battlefield");
    bg.style.backgroundColor = colors[randomArrayIndex(colors.length)];
};

function randomArrayIndex(x) {
    let decIndex=Math.random() * x;
    return Math.floor(decIndex);
}

function initMyDOM() {
    let bg = document.getElementById("battlefield");
    let div1 = document.createElement("div");
    bg.appendChild(div1);

    let letterO = document.createTextNode("O");
    div1.appendChild(letterO);

    let att = document.createAttribute("id");
    att.value = "capshield";
    div1.setAttributeNode(att);

    let cla = document.createAttribute("class");
    cla.value = "superheroweapon";
    div1.setAttributeNode(cla);

    let sty = document.createAttribute("style");
    sty.value = "top: 270px; left: 0px; font-size: 60px;";
    div1.setAttributeNode(sty);

    let div2 = document.createElement("div");
    bg.appendChild(div2);

    let letterT = document.createTextNode("T");
    div2.appendChild(letterT);

    let att2 = document.createAttribute("id");
    att2.value = "mjolnir";
    div2.setAttributeNode(att2);

    let cla2 = document.createAttribute("class");
    cla2.value = "superheroweapon";
    div2.setAttributeNode(cla2);

    let sty2 = document.createAttribute("style");
    sty2.value = "top: 280px; left: 760px; font-size: 40px; transform: rotate(270deg);";
    div2.setAttributeNode(sty2);
}

function entryPoint() {
    initMyDOM();
    initBackground();
    const T = 1000 / 50; // 20 ms
    let clash=new Clash();
    clash.timer=setInterval(clash.animate.bind(clash),T);
    clash.initWeapons();
};

// Entry point
window.onload = entryPoint;
