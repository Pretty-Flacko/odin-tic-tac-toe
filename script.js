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

function Player(marker, name) {
    const getMarker = () => marker;
    const getName = () => name;

    return {
        getMarker,
        getName,
    };
}

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