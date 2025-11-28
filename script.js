const Gameboard = (function () {
    const board = [];
    
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

    const startGame = () => {};
    const switchPlayer = () => {};
    const playRound = () => {};
    const checkWinner = () => {};
    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        switchPlayer,
        playRound,
        checkWinner,
        getCurrentPlayer
    };
})();