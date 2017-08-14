var Entity = function() {
    this.x = -250;
    this.y = 50;
    
    this.sprite = '';
    
    this.stepX = 100;
    this.stepY = 80;
}

// Draw the Entity on the screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function(yCol, speed) {
    Entity.call(this);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed ? speed: getRandom(100, 230);
    this.y += yCol * this.stepY;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x > 650) ? -150: this.x + (this.speed * dt);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this);
    
    this.sprite = 'images/char-boy.png';
  
    this.x = 200;
    this.y = 370;
    this.defaultX = this.x;
    this.defaultY = this.y;
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};

Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'up':    (this.y == 50)  ? this.reset(): this.y -= this.stepY; break;
        case 'down':  (this.y == 370) ?          NaN: this.y += this.stepY; break;
        case 'left':  (this.x == 0)   ?            0: this.x -= this.stepX; break;
        case 'right': (this.x == 400) ?          400: this.x += this.stepX; break;
    }
};

Player.prototype.reset = function() {
    this.x = this.defaultX;
    this.y = this.defaultY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy(2, 120));
allEnemies.push(new Enemy(0, 170));
allEnemies.push(new Enemy(1, 250));
allEnemies.push(new Enemy(2, 190));

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
