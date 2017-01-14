document.addEventListener("DOMContentLoaded", function() {
    console.log("The Furry game is on :)");
    
    var board = document.querySelector("#board");
    var resultDiv = document.querySelector("#resultDiv");
    var body = document.querySelector("body");

    var Furry = function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    };

    var Coin = function(x, y) {
        this.x = x;
        this.y = y;
    };


    var Game = function() {
        this.furry = new Furry(0, 0, "right");
        this.coin = new Coin(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
        this.board = document.querySelectorAll("#board div");
        this.score = 0;
        resultDiv.innerText = "Score: " + this.score;
    };

    var game = new Game();

    Game.prototype.countPosition = function(x, y) {
        return (x + y * 10);
    }


    Game.prototype.showFurry = function(x, y) {
        var index = this.countPosition(x, y);
        this.board[index].classList.add("furry");
    }
    game.showFurry(0, 0);


    Game.prototype.showCoin = function() {
        this.coin.x = Math.floor(Math.random() * 10);
        this.coin.y = Math.floor(Math.random() * 10);
        var index = this.coin.x + this.coin.y * 10;
        this.board[index].classList.add("coin");
    }
    game.showCoin();

    
    Game.prototype.hideFurry = function(x, y) {
            this.furry.x = x;
            this.furry.y = y;
            console.log(this.furry.x, this.furry.y);
            if (!(x < 0 || x > 9 || y < 0 || y > 9)) {
                var index = this.furry.x + this.furry.y * 10;
                this.board[index].classList.remove("furry");
            }
    }
    
    
    Game.prototype.moveFurry = function(x, y) {
        this.furry.x = x;
        this.furry.y = y;
        if (!(x < 0 || x > 9 || y < 0 || y > 9)) {
        	var index = x + y * 10;
        	this.board[index].classList.add("furry");
        }
        
    }


    Game.prototype.moveAroundBoard = function() {
    		var self = this;
        document.addEventListener("keydown", movingAround);
        function movingAround(event) {
            if (event.keyCode === 37) {
                self.furry.direction = "left";
            }
            if (event.keyCode === 39) {
                self.furry.direction = "right";
            }
            if (event.keyCode === 38) {
                self.furry.direction = "up";
            }
            if (event.keyCode === 40) {
                self.furry.direction = "down";
            }

        }
    }
    game.moveAroundBoard();

    Game.prototype.collectCoin = function() {
        this.furry.index = this.furry.x + this.furry.y * 10;
        this.coin.index = this.coin.x + this.coin.y * 10;
        if (this.furry.index === this.coin.index) {
            this.board[this.furry.index].classList.remove("coin");
            this.score = this.score + 1;
            resultDiv.innerText = "Score: " + this.score;
            this.showCoin();
        }

    }


    Game.prototype.collideWithWall = function(x, y) {
        var x = this.furry.x;
        var y = this.furry.y;
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            clearInterval(interval);
            console.log("Game over");

            var gameOverDiv = document.createElement("div");
            body.insertBefore(gameOverDiv, resultDiv);
            gameOverDiv.innerText = "Game over! " + resultDiv.innerText;
            gameOverDiv.setAttribute("class", "gameover");

            board.parentNode.removeChild(board);
            resultDiv.parentNode.removeChild(resultDiv);

            var gameOverDiv2 = document.createElement("div");
            body.appendChild(gameOverDiv2);
            gameOverDiv2.innerText = " Hit F5 to play again";
            gameOverDiv2.setAttribute("class", "gameover");

            var gameOverDiv3 = document.createElement("div");
            gameOverDiv3.setAttribute("class", "gameover");
            body.appendChild(gameOverDiv3);
            gameOverDiv3.style.backgroundImage = 'url("images/furry2.jpg")';
            gameOverDiv3.style.backgroundRepeat = "no-repeat";
            gameOverDiv3.style.backgroundPosition = "center left";
            gameOverDiv3.style.backgroundSize ="contain";
        }

    }


    var interval = setInterval(stepOneGame, 400);

    function stepOneGame() {
        this.game = game;
        var furry = game.furry;
        var x = furry.x
        var y = furry.y
        if (furry.direction === "left") {
            game.hideFurry(x, y);
            game.moveFurry(x - 1, y);
            game.collideWithWall(x, y);
            game.collectCoin();

        }
        if (furry.direction === "right") {
            game.hideFurry(x, y);
            game.moveFurry(x + 1, y);
            game.collideWithWall(x, y);
            game.collectCoin();
        }
        if (furry.direction === "up") {
            game.hideFurry(x, y);
            game.moveFurry(x, y - 1);
            game.collideWithWall(x, y);
            game.collectCoin();
        }
        if (furry.direction === "down") {
            game.hideFurry(x, y);
            game.moveFurry(x, y + 1);
            game.collideWithWall(x, y);
            game.collectCoin();
        }


    }


});