const gameBoard = (() => {
    const board = ["", "", ""
        , "", "", ""
        , "", "", ""
    ]
    const getBoard = () => board;
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { getBoard, resetBoard }
})()

const Player = (name, marker) => {
    return {name, marker}
}

const displayController = (() => {
    const boardContainer = document.getElementById("board-container");
    const cells = boardContainer.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    const messageContainer = document.getElementById("message-container");

    const renderBoard = (board) => {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const displayMessage = (message) => {
        messageContainer.textContent = message;
    };

    resetButton.addEventListener("click", () => {
        gameController.resetGame();
    });

    return { renderBoard, displayMessage }
})();

const gameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let isGameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        const board = gameBoard.getBoard();
        return board.every(cell => cell !== "");
    };

    const handleCellClick = (index) => {
        if (isGameOver) return;

        const board = gameBoard.getBoard();
        if (board[index] === "") {
            board[index] = currentPlayer.marker;
            displayController.renderBoard(board);

            if (checkWin()) {
                displayController.displayMessage(`${currentPlayer.name} wins!`);
                isGameOver = true;
            } else if (checkDraw()) {
                displayController.displayMessage("It's a draw!");
                isGameOver = true;
            } else {
                switchPlayer();
                displayController.displayMessage(`${currentPlayer.name}'s turn`);
            }
        }
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        displayController.renderBoard(gameBoard.getBoard());
        currentPlayer = player1;
        isGameOver = false;
        displayController.displayMessage(`${currentPlayer.name}'s turn`);
    };

    // Initialize event listeners for cells
    const boardContainer = document.getElementById("board-container");
    const cells = boardContainer.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    // Start the game
    resetGame();

    return { resetGame }
})();

