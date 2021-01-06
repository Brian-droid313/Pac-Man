document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 28;

    const layout = Layouts.sample1();

    let board = new GameBoard(width, layout[1], layout[2]);
    board.draw(layout[0]);
    const rules = new Rules(_.cloneDeep(board));
    board = null;
    rules.htmlGameBoard.forEach(square => grid.appendChild(square));
    rules.applyAllRules();
    setInterval(function() { scoreDisplay.innerHTML = rules.score; }, 1);
})
