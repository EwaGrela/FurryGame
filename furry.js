document.addEventListener("DOMContentLoaded", function() {
	
    const board = document.querySelector("#board");
    const resultDiv = document.querySelector("#resultDiv");
    const body = document.querySelector("body");

    class Furry {
        constructor (x, y, direction) {
            this.x = x;
        	this.y = y;
        	this.direction = direction;
        }
    }
    
    class Coin {
    	constructor(x,y) {
    		this.x = x
    		this.y = y
    	}
    }
    class Game {
    	constructor(furry, coin, board, score){
    		this.furry = new Furry(0, 0, "right");
        	this.coin = new Coin(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
        	this.board = document.querySelectorAll("#board div");
        	this.score = 0;
        	resultDiv.innerText = "Score: " + this.score;
        	document.game = this;
        	document.addEventListener("keydown", function(event) {
        		document.game.movingAround(event);
        	});
    	}

    	countPosition(x, y) {
        	return (x + y * 10);
    	}

    	showFurry(x, y) {
        	let index = this.countPosition(x, y);
        	this.board[index].classList.add("furry");
    	}

    	showCoin() {
	        this.coin.x = Math.floor(Math.random() * 10);
	        this.coin.y = Math.floor(Math.random() * 10);
	        let index = this.countPosition(this.coin.x, this.coin.y);
	        this.board[index].classList.add("coin");
    	}
    	hideFurry() {
            if (!(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9)) {
                let index = this.countPosition(this.furry.x, this.furry.y);
                this.board[index].classList.remove("furry");
            }
    	}
    	moveFurry(x,y) {
	        this.furry.x = x;
	        this.furry.y = y;
	        if (!(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9)) {
	        	let index = this.countPosition(this.furry.x, this.furry.y);
	        	this.board[index].classList.add("furry");
	        }
        
    	}
    	movingAround(event) {
	        if (event.keyCode === 37) {
	            this.furry.direction = "left";
	        }
	        if (event.keyCode === 39) {
	            this.furry.direction = "right";
	        }
	        if (event.keyCode === 38) {
	            this.furry.direction = "up";
	        }
	        if (event.keyCode === 40) {
	            this.furry.direction = "down";
	        }

	    }
    	
    	collectCoin() {
	        this.furry.index = this.countPosition(this.furry.x, this.furry.y);
	        this.coin.index = this.countPosition(this.coin.x, this.coin.y);
	        if (this.furry.index === this.coin.index) {
	            this.board[this.furry.index].classList.remove("coin");
	            this.score = this.score + 1;
	            resultDiv.innerText = "Score: " + this.score;
	            this.showCoin();
	        }

    	}
    	collideWithWall() {
	        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
	            clearInterval(interval);
	            const gameOverDiv = document.createElement("div");
	            body.insertBefore(gameOverDiv, resultDiv);
	            gameOverDiv.innerText = "Game over! " + resultDiv.innerText;
	            gameOverDiv.setAttribute("class", "gameover");

	            board.parentNode.removeChild(board);
	            resultDiv.parentNode.removeChild(resultDiv);

	            const gameOverDiv2 = document.createElement("div");
	            body.appendChild(gameOverDiv2);
	            gameOverDiv2.innerText = " Hit F5 to play again";
	            gameOverDiv2.setAttribute("class", "gameover");

	            const gameOverDiv3 = document.createElement("div");
	            gameOverDiv3.setAttribute("class", "gameover");
	            body.appendChild(gameOverDiv3);
	            gameOverDiv3.style.backgroundImage = 'url("images/furry2.jpg")';
	            gameOverDiv3.style.backgroundRepeat = "no-repeat";
	            gameOverDiv3.style.backgroundPosition = "center left";
	            gameOverDiv3.style.backgroundSize ="contain";
	        }

    	}

    }
    
    const game = new Game();
    game.showFurry(0, 0);
    game.showCoin();
    let interval = setInterval(stepOneGame, 500);

    function stepOneGame() {
        let furry = game.furry;
        let x = furry.x
        let y = furry.y
        if (furry.direction === "left") {
            game.hideFurry();
            game.moveFurry(x - 1, y);
            game.collideWithWall(x, y);
            game.collectCoin();

        }
        if (furry.direction === "right") {
            game.hideFurry();
            game.moveFurry(x + 1, y);
            game.collideWithWall(x, y);
            game.collectCoin();
        }
        if (furry.direction === "up") {
            game.hideFurry();
            game.moveFurry(x, y - 1);
            game.collideWithWall(x, y);
            game.collectCoin();
        }
        if (furry.direction === "down") {
            game.hideFurry();
            game.moveFurry(x, y + 1);
            game.collideWithWall(x, y);
            game.collectCoin();
        }
    }


});