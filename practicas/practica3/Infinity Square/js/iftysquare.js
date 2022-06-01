const GAME_AREA_WIDTH = 800,
    GAME_AREA_HEIGHT = 500,
    SHIP_HEIGHT = 40,
    SHIP_WIDTH = 86,
    SMALL_SQUARE_SIZE = 20,
    SMALL_SQUARE_COLOR = "#000000",
    SMALL_SQUARE_MIN_SPEED = 0,
    SMALL_SQUARE_MAX_SPEED = 7,
    SMALL_SQUARE_TIME_SUBTRACT_EASY = 5,
    SMALL_SQUARE_PROBABILITY_EASY = .002,
    SMALL_SQUARE_TIME_SUBTRACT_NORMAL = 15,
    SMALL_SQUARE_PROBABILITY_NORMAL = .005,
    SMALL_SQUARE_TIME_SUBTRACT_HARD = 25,
    SMALL_SQUARE_PROBABILITY_HARD = .008,
    LIVES = 3,
    SQUARE_SIZE = 40,
    SQUARE_COLOR = "#cc0000",
    SQUARE_SPEED_X = 5,
    SQUARE_SPEED_Y = 5,
    OBSTACLE_SPEED_EASY = 1,
    OBSTACLE_SPEED_NORMAL =
    2,
    OBSTACLE_SPEED_HARD = 4,
    OBSTACLE_COLOR = "#187440",
    OBSTACLE_MIN_HEIGHT = 40,
    OBSTACLE_MAX_HEIGHT = GAME_AREA_HEIGHT - 100,
    OBSTACLE_WIDTH = 20,
    OBSTACLE_MIN_GAP = 55,
    OBSTACLE_MAX_GAP = GAME_AREA_HEIGHT - 100,
    PROBABILITY_OBSTACLE_EASY = .5,
    PROBABILITY_OBSTACLE_NORMAL = .7,
    PROBABILITY_OBSTACLE_HARD = .9,
    FRAME_OBSTACLE_EASY = 145,
    FRAME_OBSTACLE_NORMAL = 85,
    FRAME_OBSTACLE_HARD = 45,
    FPS = 30,
    CHRONO_MSG = "Time goes by...",
    RIGHTARROW_KEYCODE = 39,
    LEFTARROW_KEYCODE = 37,
    UPARROW_KEYCODE = 38,
    DOWNARROW_KEYCODE = 40;
class SquaredForm {
    constructor(a, b, c, d, e, f = null) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        this.color = e;
        this.img = f;
        this.speedY = this.speedX = 0
    }
    setX(a) {
        this.x = a
    }
    setY(a) {
        this.y = a
    }
    setSpeedX(a) {
        this.speedX = a
    }
    setSpeedY(a) {
        this.speedY = a
    }
    render(a) {
        null == this.img ? (a.fillStyle = this.color, a.fillRect(this.x, this.y, this.width, this.height)) : a.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY
    }
    setIntoArea(a, b) {
        this.x = Math.min(Math.max(0, this.x), a - this.width);
        this.y = Math.min(Math.max(0, this.y), b - this.height)
    }
    crashWith(a) {
        let b = this.x,
            c = this.x + this.width,
            d = this.y,
            e = a.x,
            f = a.x + a.width,
            g = a.y + a.height,
            h = !0;
        if (this.y + this.height < a.y || d > g || c < e || b > f) h = !1;
        return h
    }
}
class GameArea {
    constructor(a, b, c, d) {
        this.canvas = a;
        this.hero = b;
        this.obstacles = c;
        this.smallSquares = d;
        this.interval = this.livesPlaceHolder = this.context = null;
        this.frameNumber = void 0
    }
    initialise() {
        this.canvas.width = GAME_AREA_WIDTH;
        this.canvas.height = GAME_AREA_HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameplay").appendChild(this.canvas);
        this.interval = setInterval(updateGame, 1E3 / FPS);
        this.frameNumber = 0;
        this.livesPlaceHolder = document.getElementById("livesleft")
    }
    renderLives() {
        if (0 ==
            this.livesPlaceHolder.childNodes.length) {
            let a = Math.round(SHIP_WIDTH / 1.4),
                b = Math.round(SHIP_HEIGHT / 1.4);
            for (let c = 0; c < LIVES; c++) {
                let d = document.createElement("img"),
                    e = document.createAttribute("src");
                e.value = "imgs/spaceship.png";
                d.setAttributeNode(e);
                e = document.createAttribute("width");
                e.value = a.toString();
                d.setAttributeNode(e);
                e = document.createAttribute("height");
                e.value = b.toString();
                d.setAttributeNode(e);
                this.livesPlaceHolder.appendChild(d)
            }
            this.livesPlaceHolder.style.backgroundColor = "#ff8800";
            this.livesPlaceHolder.style.borderColor =
                "#ff3300";
            this.livesPlaceHolder.style.borderStyle = "solid";
            this.livesPlaceHolder.style.borderWidth = "3px"
        } else this.livesPlaceHolder.removeChild(this.livesPlaceHolder.childNodes[this.livesPlaceHolder.childNodes.length - 1])
    }
    render() {
        for (const a of this.obstacles) a.render(this.context);
        for (const a of this.smallSquares) a.render(this.context);
        this.hero.render(this.context)
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    addObstacle(a) {
        this.obstacles.push(a)
    }
    removeObstacle(a) {
        this.obstacles.splice(a,
            1)
    }
    addSmallSquare(a) {
        this.smallSquares.push(a)
    }
    removeSmallSquare(a) {
        this.smallSquares.splice(a, 1)
    }
    removeAllObjects() {
        this.obstacles.length = this.smallSquares.length = 0
    }
}
let theImage = new Image;
theImage.src = "imgs/spaceship.png";
let theSquare = new SquaredForm(0, GAME_AREA_HEIGHT / 2, SHIP_WIDTH, SHIP_HEIGHT, null, theImage),
    nLivesLeft = LIVES,
    gamePaused = !1,
    endScreen, probSmallSquare, timeSubSmallSquare, speedObstacle, probObstacle, frameObstacle, rightArrowPressed = !1,
    leftArrowPressed = !1,
    upArrowPressed = !1,
    downArrowPressed = !1,
    seconds, timeout, theChrono, continueGame = !0,
    gameArea = new GameArea(document.createElement("canvas"), theSquare, [], []);

function handlerOne(a) {
    switch (a.keyCode) {
        case RIGHTARROW_KEYCODE:
            rightArrowPressed || (rightArrowPressed = !0, theSquare.setSpeedX(SQUARE_SPEED_X));
            break;
        case LEFTARROW_KEYCODE:
            leftArrowPressed || (leftArrowPressed = !0, theSquare.setSpeedX(-SQUARE_SPEED_X));
            break;
        case UPARROW_KEYCODE:
            upArrowPressed || (upArrowPressed = !0, theSquare.setSpeedY(-SQUARE_SPEED_Y));
            break;
        case DOWNARROW_KEYCODE:
            downArrowPressed || (downArrowPressed = !0, theSquare.setSpeedY(SQUARE_SPEED_Y))
    }
}

function handlerTwo(a) {
    switch (a.keyCode) {
        case RIGHTARROW_KEYCODE:
            rightArrowPressed = !1;
            theSquare.setSpeedX(0);
            break;
        case LEFTARROW_KEYCODE:
            leftArrowPressed = !1;
            theSquare.setSpeedX(0);
            break;
        case UPARROW_KEYCODE:
            upArrowPressed = !1;
            theSquare.setSpeedY(0);
            break;
        case DOWNARROW_KEYCODE:
            downArrowPressed = !1, theSquare.setSpeedY(0)
    }
}

function startGame() {
    endScreen = document.getElementById("endScreen");
    let a = document.getElementsByName("level"),
        b;
    for (const c of a) c.checked && (b = parseInt(c.value, 10));
    switch (b) {
        case 1:
            probSmallSquare = SMALL_SQUARE_PROBABILITY_EASY;
            timeSubSmallSquare = SMALL_SQUARE_TIME_SUBTRACT_EASY;
            probObstacle = PROBABILITY_OBSTACLE_EASY;
            speedObstacle = OBSTACLE_SPEED_EASY;
            frameObstacle = FRAME_OBSTACLE_EASY;
            break;
        case 2:
            probSmallSquare = SMALL_SQUARE_PROBABILITY_NORMAL;
            timeSubSmallSquare = SMALL_SQUARE_TIME_SUBTRACT_NORMAL;
            probObstacle =
                PROBABILITY_OBSTACLE_NORMAL;
            speedObstacle = OBSTACLE_SPEED_NORMAL;
            frameObstacle = FRAME_OBSTACLE_NORMAL;
            break;
        case 3:
            probSmallSquare = SMALL_SQUARE_PROBABILITY_HARD, timeSubSmallSquare = SMALL_SQUARE_TIME_SUBTRACT_HARD, probObstacle = PROBABILITY_OBSTACLE_HARD, speedObstacle = OBSTACLE_SPEED_HARD, frameObstacle = FRAME_OBSTACLE_HARD
    }
    document.getElementById("initial").style.display = "none";
    gameArea.initialise();
    gameArea.renderLives();
    gameArea.render();
    window.document.addEventListener("keydown", handlerOne);
    window.document.addEventListener("keyup",
        handlerTwo);
    seconds = 0;
    timeout = window.setTimeout(updateChrono, 1E3);
    theChrono = document.getElementById("chrono")
}

function updateGame() {
    if (!gamePaused) {
        var a = !1;
        for (var b = 0; b < gameArea.obstacles.length; b++)
            if (theSquare.crashWith(gameArea.obstacles[b])) {
                a = !0;
                break
            } if (a) nLivesLeft--, gameArea.renderLives(), 0 == nLivesLeft ? endGame() : (gameArea.removeAllObjects(), theSquare.setX(0), theSquare.setY(GAME_AREA_HEIGHT / 2), gamePaused = !0, window.setTimeout(restartGame, 3E3));
        else {
            gameArea.frameNumber += 1;
            gameArea.frameNumber >= frameObstacle && (gameArea.frameNumber = 1);
            if (1 == gameArea.frameNumber && Math.random() < probObstacle) {
                a = Math.floor(Math.random() *
                    (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT + 1) + OBSTACLE_MIN_HEIGHT);
                b = Math.floor(Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP + 1) + OBSTACLE_MIN_GAP);
                var c = new SquaredForm(gameArea.canvas.width, 0, OBSTACLE_WIDTH, a, OBSTACLE_COLOR);
                c.setSpeedX(-speedObstacle);
                gameArea.addObstacle(c);
                a + b + OBSTACLE_MIN_HEIGHT <= gameArea.canvas.height && (c = new SquaredForm(gameArea.canvas.width, a + b, OBSTACLE_WIDTH, gameArea.canvas.height - a - b, OBSTACLE_COLOR), c.setSpeedX(-speedObstacle), gameArea.addObstacle(c))
            }
            Math.random() < probSmallSquare &&
                (a = Math.floor(Math.random() * (SMALL_SQUARE_MAX_SPEED - SMALL_SQUARE_MIN_SPEED + 1) + SMALL_SQUARE_MIN_SPEED), b = Math.floor(Math.random() * (SMALL_SQUARE_MAX_SPEED - SMALL_SQUARE_MIN_SPEED + 1) + SMALL_SQUARE_MIN_SPEED), c = new SquaredForm(gameArea.canvas.width - SMALL_SQUARE_SIZE, Math.floor(Math.random() * (gameArea.canvas.height - SMALL_SQUARE_SIZE + 1)), SMALL_SQUARE_SIZE, SMALL_SQUARE_SIZE, SMALL_SQUARE_COLOR), c.setSpeedX(-a), c.setSpeedY(b), gameArea.addSmallSquare(c));
            for (a = gameArea.obstacles.length - 1; 0 <= a; a--) gameArea.obstacles[a].move(),
                0 >= gameArea.obstacles[a].x + OBSTACLE_WIDTH && gameArea.removeObstacle(a);
            for (a = 0; a < gameArea.smallSquares.length; a++)
                if (b = gameArea.smallSquares[a], b.move(), 0 >= b.x + SMALL_SQUARE_SIZE) gameArea.removeSmallSquare(a);
                else if (b.y + b.height >= gameArea.canvas.height || 0 >= b.y) b.setSpeedY(-b.speedY), b.setIntoArea(gameArea.canvas.width, gameArea.canvas.height);
            a = !1;
            b = 0;
            for (c = 0; c < gameArea.smallSquares.length; c++)
                if (theSquare.crashWith(gameArea.smallSquares[c])) {
                    a = !0;
                    b = c;
                    break
                } a && (gameArea.removeSmallSquare(b), seconds =
                Math.max(0, seconds - timeSubSmallSquare));
            theSquare.move();
            theSquare.setIntoArea(gameArea.canvas.width, gameArea.canvas.height);
            gameArea.clear();
            gameArea.render()
        }
    }
}

function updateChrono() {
    if (!gamePaused && continueGame) {
        seconds++;
        let a = seconds % 60;
        theChrono.innerHTML = CHRONO_MSG + " " + String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(a).padStart(2, "0");
        timeout = window.setTimeout(updateChrono, 1E3)
    }
}

function restartGame() {
    gamePaused = !1;
    window.setTimeout(updateChrono, 1E3)
}

function endGame() {
    continueGame = !1;
    clearInterval(gameArea.interval);
    window.document.removeEventListener("keydown", handlerOne);
    window.document.removeEventListener("keyup", handlerTwo);
    window.setTimeout(showEndScreen, 2E3)
}

function showEndScreen() {
    var a = document.getElementsByTagName("header");
    a[0].style.display = "none";
    a = document.getElementsByTagName("footer");
    a[0].style.display = "none";
    theChrono.style.display = "none";
    gameArea.livesPlaceHolder.style.display = "none";
    a = document.getElementById("gameplay");
    a.style.display = "none";
    a = Math.floor(seconds / 60);
    seconds %= 60;
    a = document.createTextNode("Final time in chrono: " + String(a).padStart(2, "0") + ":" + String(seconds).padStart(2, "0"));
    endScreen.appendChild(a);
    endScreen.style.display =
        "inline-block"
};