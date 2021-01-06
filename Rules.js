class Rules {
    constructor(board) 
    {
        this.leftExit = board.leftExit;
        this.rightExit = board.rightExit;
        this.score = 0;

        this.boardWidth = board.width;
        this.htmlGameBoard = board.htmlGameBoard;
        this.pacman = board.pacman;
        this.ghosts = board.ghosts;
        this.numPacDots = board.countPacDots();
        this.numPowerPellets = board.countPowerPellets();
        this.collectedPacDots = 0;
        this.collectedPowerPellets = 0;
    }

    movePacman = (e) => {
        this.htmlGameBoard[this.pacman.currentLocation].src = './images/black-square.png';
        let pacmanImageSrc = '';
        switch(e.keyCode)
        {
            case 37:
                if(this.pacman.currentLocation === this.leftExit)
                {
                    this.pacman.currentLocation += this.boardWidth - 1;
                }
                else if(
                    this.pacman.currentLocation % this.boardWidth !== 0 && 
                    !this.htmlGameBoard[this.pacman.currentLocation - 1].classList.contains('wall') &&
                    !this.htmlGameBoard[this.pacman.currentLocation - 1].classList.contains('ghost-lair') &&
                    !this.isCollisonWithUnscaredGhost(this.pacman.currentLocation - 1))
                {
                    this.pacman.currentLocation--;
                }
                pacmanImageSrc = './images/pacman/pacman-left.png';
                break;
            case 38:
                if(
                    this.pacman.currentLocation - this.boardWidth >= 0 && 
                    !this.htmlGameBoard[this.pacman.currentLocation - this.boardWidth].classList.contains('wall') &&
                    !this.htmlGameBoard[this.pacman.currentLocation - this.boardWidth].classList.contains('ghost-lair') &&
                    !this.isCollisonWithUnscaredGhost(this.pacman.currentLocation - this.boardWidth))
                {
                    this.pacman.currentLocation -= this.boardWidth;
                }
                pacmanImageSrc = './images/pacman/pacman-up.png';
                break;
            case 39:
                if(this.pacman.currentLocation === this.rightExit) {
                    this.pacman.currentLocation -= this.boardWidth - 1;
                }
                else if(
                    this.pacman.currentLocation % this.boardWidth < this.boardWidth - 1 && 
                    !this.htmlGameBoard[this.pacman.currentLocation + 1].classList.contains('wall') &&
                    !this.htmlGameBoard[this.pacman.currentLocation + 1].classList.contains('ghost-lair') &&
                    !this.isCollisonWithUnscaredGhost(this.pacman.currentLocation + 1))
                {
                    this.pacman.currentLocation++;
                }
                pacmanImageSrc = './images/pacman/pacman-right.png';
                break;
            case 40:
                if(
                    this.pacman.currentLocation + this.boardWidth < this.boardWidth * this.boardWidth && 
                    !this.htmlGameBoard[this.pacman.currentLocation + this.boardWidth].classList.contains('wall') &&
                    !this.htmlGameBoard[this.pacman.currentLocation + this.boardWidth].classList.contains('ghost-lair') &&
                    !this.isCollisonWithUnscaredGhost(this.pacman.currentLocation + this.boardWidth)) 
                {
                    this.pacman.currentLocation += this.boardWidth;
                }
                pacmanImageSrc = './images/pacman/pacman-down.png';
                break;
        }
        this.collisonWithScaredGhost();
        this.htmlGameBoard[this.pacman.currentLocation].src = pacmanImageSrc;
        this.pacDotEaten();
        this.powerPelletEaten();
        if(this.collectedPacDots + this.collectedPowerPellets === this.numPacDots + this.numPowerPellets) {
            this.gameOverAlert(this, 'You have won! \nYour score is: ' + this.score);
        }
    }

    isCollisonWithUnscaredGhost(moveToIndex) {
        this.ghosts.forEach(ghost => {
            if(moveToIndex === ghost.currentLocation && ghost.isScared === false) {
                this.gameOverAlert(this, 'You died :( \nYour score is: ' + this.score);
                return true;
            }
        })
        return false;    
    }

    collisonWithScaredGhost() {
        this.ghosts.forEach(ghost => {
            if(this.pacman.currentLocation === ghost.currentLocation && ghost.isScared === true) {
                this.htmlGameBoard[ghost.currentLocation].classList.remove('ghost', 'scared-ghost');
                this.updateScore(25);
                ghost.isScared = false;
                ghost.currentLocation = ghost.startLocation;
                this.htmlGameBoard[ghost.currentLocation].classList.add('ghost');
                this.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + ghost.name + '.png';

            }
        })
    }

    moveGhost(ghost) 
    {
        const directions  = [-1, 1, this.boardWidth, -this.boardWidth];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        let bind = this;
        ghost.timerId = setInterval(function() {
            if(
                !bind.htmlGameBoard[ghost.currentLocation + direction].classList.contains('ghost') &&
                !bind.htmlGameBoard[ghost.currentLocation + direction].classList.contains('wall')) 
            {
                bind.htmlGameBoard[ghost.currentLocation].classList.remove('ghost', 'scared-ghost');

                if(bind.htmlGameBoard[ghost.currentLocation].classList.contains('pac-dot')) 
                {
                    bind.htmlGameBoard[ghost.currentLocation].src = './images/pacman-dot.png';
                }
                else if(bind.htmlGameBoard[ghost.currentLocation].classList.contains('power-pellet'))
                {
                    bind.htmlGameBoard[ghost.currentLocation].src = './images/power-pellet.png';
                }
                else 
                { 
                    bind.htmlGameBoard[ghost.currentLocation].src = './images/black-square.png';
                }
                ghost.currentLocation += direction;
            } 
            else 
            {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }

            if(ghost.isScared && ghost.currentLocation === bind.pacman.currentLocation)
            {
                bind.htmlGameBoard[ghost.currentLocation].classList.remove('ghost', 'scared-ghost');
                bind.updateScore(25);
                ghost.isScared = false;
                ghost.currentLocation = ghost.startLocation;
                bind.htmlGameBoard[ghost.currentLocation].classList.add('ghost');
                bind.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + ghost.name + '.png';
            }
            else if(!ghost.isScared && ghost.currentLocation === bind.pacman.currentLocation)
            {
                bind.htmlGameBoard[ghost.currentLocation].classList.add('ghost');
                bind.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + ghost.name + '.png';
                bind.gameOverAlert(bind, 'You died :( \nYour score is: ' + bind.score);
            }
            else if(ghost.isScared)
            {
                bind.htmlGameBoard[ghost.currentLocation].classList.add('scared-ghost', 'ghost');
                bind.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + 'scared.png';
            }
            else
            {
                bind.htmlGameBoard[ghost.currentLocation].classList.add('ghost');
                bind.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + ghost.name + '.png';
            }
        }, ghost.speed)
    }

    pacDotEaten() 
    {
        if(this.htmlGameBoard[this.pacman.currentLocation].classList.contains('pac-dot')) 
        {
            this.htmlGameBoard[this.pacman.currentLocation].classList.remove('pac-dot');
            this.collectedPacDots++;
            this.updateScore(1);
        }
    }

    powerPelletEaten() {
        if(this.htmlGameBoard[this.pacman.currentLocation].classList.contains('power-pellet')) 
        {
            this.htmlGameBoard[this.pacman.currentLocation].classList.remove('power-pellet');
            this.collectedPowerPellets++;
            this.updateScore(10);
            this.scareGhosts();
            setTimeout(this.unscareGhost, 10000);
        }
    }  

    scareGhosts() 
    {
        this.ghosts.forEach(ghost => ghost.isScared = true);
    }

    unscareGhost = () => {
        this.ghosts.forEach(ghost => ghost.isScared = false);
    }

    gameOverAlert(obj, message) {
        document.removeEventListener('keydown', obj.movePacman);
        obj.ghosts.forEach(ghost => clearInterval(ghost.timerId));
        Swal.fire({
            title: message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Play Again?',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          })
          throw new Error("Game Finished");
    }

    updateScore(additionFactor) 
    {
        this.score += additionFactor;      
    }

    applyAllRules() 
    {
        document.addEventListener('keydown', this.movePacman);
        this.ghosts.forEach(ghost => this.moveGhost(ghost));
    }
}
