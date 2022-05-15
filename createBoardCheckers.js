const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

let pieces = [];
let table;
let cell;
let selectedCell;
let pieceOld = null;
let turn = WHITE_PLAYER;
let lastRow;
let lastCol;
let winner;
let deletedBlack = 0;
let deletedWhite = 0;
let whoCanEat = [];
let canMove;

// Return list of all the pieces on the board.
function piecesOnBoard() {
    let pieces = [];
    for (i = 0; i < 8; i += 2) {
        pieces.push(new Piece(0, i, BLACK_PLAYER));
        pieces.push(new Piece(1, i + 1, BLACK_PLAYER));
        pieces.push(new Piece(2, i, BLACK_PLAYER));
        pieces.push(new Piece(5, i + 1, WHITE_PLAYER));
        pieces.push(new Piece(6, i, WHITE_PLAYER));
        pieces.push(new Piece(7, i + 1, WHITE_PLAYER));
    }
    return pieces;
}


// Creates checkers board.
function createCheckersBoard() {

    // Creates background.
    background = document.createElement('div');
    document.body.appendChild(background);
    background.classList.add("background");

    // Creates a title.
    heading = document.createElement('H1');
    textNode = document.createTextNode("Checkers game");
    heading.appendChild(textNode);
    document.body.appendChild(heading);
    heading.classList.add("h1");

    // Creates white turn/black turn.
    turnText = document.createElement('H1');
    textNodeTurnText = document.createTextNode("white turn");
    turnText.appendChild(textNodeTurnText);
    background.appendChild(turnText);
    turnText.classList.add("turn");

    // Creates the table.
    table = document.createElement('table');
    table.className = "table";
    background.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = table.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            cell = rowElement.insertCell();
            if ((row + col) % 2 === 0) {
                cell.className = "square blacksquare";
            } else {
                cell.className = "square whitesquare";
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }

        // Show who won.
        whoWin = document.createElement('H1');
        textNodeWinnerText = document.createTextNode("");
        whoWin.appendChild(textNodeWinnerText);
        whoWin.className = "out";
        table.appendChild(whoWin);

    }
    boardData = new BoardData(piecesOnBoard());

}

// Call the function who creates the board
window.addEventListener('load', createCheckersBoard);