// Entity superclass
var Entity = function() {
    this.x = -250;
    this.y = 50;

    this.sprite = '';

    this.stepX = 50;
    this.stepY = 80;
}

// Draw the Entity on the screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies class
var Enemy = function(yCol, speed) {
    Entity.call(this);

    this.speed = speed || getRandom(100, 230);
    this.y += yCol * this.stepY;

    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply movement by the dt parameter to ensure game runs at same speed for all computers
    this.x = (this.x > 650) ? -150: this.x + (this.speed * dt);

    // Collision detection
    if (this.sameLaneAsPlayer() && this.bumpedIntoPlayer()) {
        player.reset();
    }
};

Enemy.prototype.sameLaneAsPlayer = function() {
    return this.y == player.y;
}

Enemy.prototype.bumpedIntoPlayer = function() {
    return this.x > (player.x-50) && this.x < (player.x+50);
}

// Player class
var Player = function() {
    Entity.call(this);

    this.sprite = 'images/char-boy.png';

    this.x = 200;
    this.y = 370;
    this.defaultX = this.x;
    this.defaultY = this.y;

    this.point = 0;
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.font = '60px serif';
    ctx.fillStyle = "rgba(235, 235, 235, 0.7)";
    ctx.textAlign = "center";
    ctx.fillText(this.point, 252, 110);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'up':    (this.y <= 50)  ? this.score(): this.y -= this.stepY; break;
        case 'down':  (this.y >= 370) ?          NaN: this.y += this.stepY; break;
        case 'left':  (this.x <= 0)   ?            0: this.x -= this.stepX; break;
        case 'right': (this.x >= 400) ?          400: this.x += this.stepX; break;
    }
};

Player.prototype.reset = function() {
    this.x = this.defaultX;
    this.y = this.defaultY;
};

Player.prototype.score = function() {
    this.point += 1;
    this.reset();
};

// Game objects instantiation
var allEnemies = [];
allEnemies.push(new Enemy(2, 120));
allEnemies.push(new Enemy(0, 170));
allEnemies.push(new Enemy(1, 250));
allEnemies.push(new Enemy(2, 190));

var player = new Player();

// Adding key-press event listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
