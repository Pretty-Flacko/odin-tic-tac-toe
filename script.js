const Gameboard = (function () {
    let board = [];
    
    const init = () => {
        board = Array(9).fill(null);
    };

    const getCell = (index) => {
        return board[index];
    };

    const setCell = (index, marker) => {
        board[index] = marker;
    };

    const reset = () => {
        init();
    };

    init();
    
    return {
        getCell,
        setCell,
        reset
    };
})();

const Player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;

    const getName = () => playerName;
    const getMarker = () => playerMarker;

    return {
        getName,
        getMarker
    };
};

const GameController = (function () {
    let currentPlayer;
    let players = [];

    const startGame = () => {
        players = [Player("Player 1", "X"), Player("Player 2", "O")];
        currentPlayer = players[0];
        Gameboard.reset();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const playRound = (index) => {
        Gameboard.setCell(index, currentPlayer.getMarker());
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  //columns
            [0, 4, 8], [2, 4, 6]              // diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                Gameboard.getCell(a) &&
                Gameboard.getCell(a) === Gameboard.getCell(b) &&
                Gameboard.getCell(a) === Gameboard.getCell(c)
            ) {
                return currentPlayer;
            }
        }

        const boardFull = (() => {
            for (let i = 0; i < 9; i++) {
                if (Gameboard.getCell(i) === null) return false;
            }
            return true;
        })();
        
        if (boardFull) return "tie";
        return null;
    };

    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        switchPlayer,
        playRound,
        checkWinner,
        getCurrentPlayer
    };
})();

GameController.startGame();

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");

    const renderBoard = () => {
        cells.forEach((cell, index) => {
            const marker = Gameboard.getCell(index);
            cell.textContent = marker ?? "";
        });
    };
    
    const setupCellListeners = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (Gameboard.getCell(index)) return;
                GameController.playRound(index);
                renderBoard();

                const winner = GameController.checkWinner();
                if (winner) {
                    message.textContent =
                        winner === "tie" ? "It's a tie" : `${winner.getName()} wins!`;
                } else {
                    GameController.switchPlayer();
                    message.textContent = `${GameController.getCurrentPlayer().getName()}'s turn`;
                }
            });
        });
    };

    const init = () => {
        renderBoard();
        setupCellListeners();
        message.textContent = `${GameController.getCurrentPlayer().getName()}'s turn`;

        resetButton.addEventListener("click", () => {
            GameController.startGame();
            renderBoard();
            message.textContent = `${GameController.getCurrentPlayer().getName()}'s turn`;
        });
    };

    init();
})();