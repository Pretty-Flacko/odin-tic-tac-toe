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