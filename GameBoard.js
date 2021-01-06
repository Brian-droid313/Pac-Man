class GameBoard 
{
    constructor(width, leftExit = - 1, rightExit = -1) 
    {
        this.pacman = new Pacman(490);
        this.ghosts = [
            new Ghost('blinky', 348, 100),
            new Ghost('pinky', 376, 100),
            new Ghost('inky', 351, 100),
            new Ghost('clyde', 379, 100)
        ]
        this.width = width;
        this.htmlGameBoard = [];
        this.leftExit = leftExit;
        this.rightExit = rightExit;
    }

    draw(layout) 
    {
        for(let i = 0; i < layout.length; i++) 
        {
            const square = document.createElement('img');
            square.classList.add('image');

            if(layout[i] === 0)
            {
                square.classList.add('pac-dot');
                square.src = './images/pacman-dot.png';
            }
            else if(layout[i] === 1)
            {
                square.classList.add('wall');
                square.src = './images/blue-wall.png'
            }
            else if(layout[i] === 2)
            {
                square.classList.add('ghost-lair');
                square.src = './images/black-square.png'
            }
            else if(layout[i] === 3) { 
                square.classList.add('power-pellet');
                square.src = './images/power-pellet.png'; 
            }
            else {
                square.src = './images/black-square.png'; 
            }

            this.htmlGameBoard.push(square);
        }
        this.htmlGameBoard[this.pacman.currentLocation].src = './images/pacman/pacman-right.png';

        this.ghosts.forEach(ghost => {
            this.htmlGameBoard[ghost.currentLocation].classList.add('ghost');
            this.htmlGameBoard[ghost.currentLocation].src = './images/ghosts/' + ghost.name + '.png';
        })
    }

    countPacDots() {
        let numDots = 0;
        this.htmlGameBoard.forEach(square => {
            if(square.classList.contains('pac-dot')) {
                numDots++;
            }
        });
        return numDots;
    }

    countPowerPellets() {
        let numPellets = 0;
        this.htmlGameBoard.forEach(square => {
            if(square.classList.contains('power-pellet')) {
                numPellets++;
            }
        });
        return numPellets;
    }


}
