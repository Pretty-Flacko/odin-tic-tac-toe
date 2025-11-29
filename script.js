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
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  //columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    const startGame = (name1 = "Player 1", name2 = "Player 2") => {
        players = [Player(name1, "X"), Player(name2, "O")];
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

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const player1Input = document.getElementById("player1-name");
    const player2Input = document.getElementById("player2-name");
    let gameStarted = false;

    const renderBoard = () => {
        cells.forEach((cell, index) => {
            const marker = Gameboard.getCell(index);
            cell.textContent = marker ?? "";
        });
    };

    const updateMessage = () => {
        if (!gameStarted) {
            message.textContent = 'Click "Start Game"';
            return;
        }

        const winner = GameController.checkWinner();

        if (winner) {
            message.textContent =
                winner === "tie" ? "It's a tie" : `${winner.getName()} wins!`;
        } else {
            message.textContent = `${GameController.getCurrentPlayer().getName()}'s turn`;
        }
    };
    
    const setupCellListeners = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (!gameStarted ||
                    Gameboard.getCell(index) ||
                    GameController.checkWinner()) return;
                
                GameController.playRound(index);
                renderBoard();

                const winner = GameController.checkWinner();
                if (!winner) {
                    GameController.switchPlayer();
                } else {
                    cells.forEach((cell) => {cell.style.backgroundColor = "lightgrey";});
                }
                updateMessage();
            });
        });
    };

    const setupStartButton = () => {
        startButton.addEventListener("click", () => {
            const name1 = player1Input.value || "Player 1";
            const name2 = player2Input.value || "Player 2";
            gameStarted = true;

            GameController.startGame(name1, name2);
            cells.forEach((cell) => {cell.style.backgroundColor = "white";});
            startButton.disabled = true;
            resetButton.disabled = false;
            player1Input.disabled = true;
            player2Input.disabled = true;
            
            renderBoard();
            updateMessage();
        });
    };

    const setupResetButton = () => {
        resetButton.addEventListener("click", () => {
            Gameboard.reset();
            gameStarted = false;

            cells.forEach((cell) => {cell.style.backgroundColor = "lightgrey";});
            startButton.disabled = false;
            resetButton.disabled = true;
            player1Input.disabled = false;
            player1Input.value = "";
            player2Input.disabled = false;
            player2Input.value = "";
            
            renderBoard();
            updateMessage();
        });
    };

    const init = () => {
        resetButton.disabled = true;
        renderBoard();
        setupCellListeners();
        setupStartButton();
        setupResetButton();
    };

    init();
})();