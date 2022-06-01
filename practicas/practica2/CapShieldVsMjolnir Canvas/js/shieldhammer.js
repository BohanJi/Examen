class Weapon {
    constructor(c2d,filename,l,t) {
        this.canvas2d = c2d;
        this.image = new Image();
        this.image.myparent = this;
        this.image.src = filename;
        this.image.onload = function () {
            let m = this.myparent;
            m.canvas2d.drawImage(this,l,t);
            m.width = this.naturalWidth;
    };
    this.left = l;
    this.top = t;
    this.width;
    };
    clear() {
        let l = this.left, t = this.top;
        let w = this.image.naturalWidth;
        let h = this.image.naturalHeight;
        this.canvas2d.clearRect(l,t,w,h);
    };
    move(n) {
        this.left += n;
        let i = this.image;
        let l = this.left;
        let t = this.top;
        this.canvas2d.drawImage(i,l,t);
    };
};

let colors = ["cyan","green","gray","blue"];
let cIndex = 0;

class Clash {
    constructor(shield, mjolnir, timer){
        this.shield=shield;
        this.mjolnir=mjolnir;
        this.timer=timer;
        this.advancing = false;
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
        this.shield.clear();
        this.mjolnir.clear();
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
        this.cv = document.getElementById("scene");
        let ctx = this.cv.getContext("2d");
        let sh = "images/CaptainAmericaShield.png";
        this.shield = new Weapon(ctx,sh,0,260);
        let mj = "images/ThorMjolnir.png";
        this.mjolnir = new Weapon(ctx,mj,651,250);
    };

    mouseOverOutCanvas = function () {
        this.cv.onmouseover = function () {
            this.advancing = true;
        };
        this.cv.addEventListener("mouseout",
        function() {
            this.advancing = false;
        });
    };
    animate = function () {
        if (this.advancing)
            this.advanceWeapons();
        this.changeBackgroungColor();
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
};

function entryPoint() {
    initBackground();
    const T = 1000 / 50; // 20 ms
    let clash=new Clash();
    clash.initWeapons();
    clash.mouseOverOutCanvas();
    clash.timer=setInterval(clash.animate.bind(clash),T);
};

// Entry point
window.onload = entryPoint;
