const Gameboard = (function () {
    const board = [];
    function initializeBoard() {};
    function updateCell() {};
    function getCell() {};
    function resetBoard() {};
    
    return {
        initializeBoard,
        updateCell,
        getCell,
        resetBoard
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