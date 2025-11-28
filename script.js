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

    const makeMove = (index) => {
        console.log(`${playerName} tries to mark cell ${index} with ${playerMarker}`);
    };

    return {
        getName,
        getMarker,
    };
};

const GameController = (function () {
    let currentPlayer;
    let players = [];

    const startGame = () => {
        console.log("Game started!");
        players = [Player("Player 1", "X"), Player("Player 2", "0")];
        currentPlayer = players[0];
        Gameboard.reset();
    };

    const switchPlayer = () => {
        console.log("Switching player...");
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const playRound = (index) => {
        console.log(`Player ${currentPlayer.getName()} plays at cell ${index}`);
        Gameboard.setCell(index, currentPlayer.getMarker());
    };

    const checkWinner = () => {
        console.log("Checking winner...");
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
                console.log(`Player ${currentPlayer.getName()} wins!`);
                return currentPlayer;
            }
        }

        const boardFull = (() => {
            for (let i = 0; i < 9; i++) {
                if (Gameboard.getCell(i) === null) return false;
            }
            return true;
        })();
        if (boardFull) {
            console.log("It's a tie!");
            return "tie";
        }

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

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");

    const renderBoard = () => {
        cells.forEach((cell, index) => {
            const marker = Gameboard.getCell(index);
            cell.textContent = marker ?? "";
        });
    };
    const init = () => {
        renderBoard();
    };

    return {
        init,
        renderBoard
    };
})();

DisplayController.renderBoard();