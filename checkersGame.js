const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

let pieces = [];
let table;
let cell;

class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
    }
}

class Piece {
    constructor(row, col, player) {
        this.row = row;
        this.col = col;
        this.player = player;
        this.deleted = false;
        this.initializePiece();
    }

    appendPiece() {
        const cell = table.rows[this.row].cells[this.col];
        if(this.player===WHITE_PLAYER){
            cell.appendChild(this.pieceWhite);
        }
        if(this.player===BLACK_PLAYER){
            cell.appendChild(this.pieceBlack);
        }
           
    }

    initializePiece() {
        this.pieceWhite = document.createElement('div');
        this.pieceWhite.className = "pieceWhite";
        this.pieceBlack = document.createElement('div');
        this.pieceBlack.className = "pieceBlack";
        this.appendPiece();
    }
}


// Add the pieces
function piecesOnBoard() {
    let pieces = [];
    for (i = 0; i < 8; i += 2) {
        pieces.push(new Piece(0, i, BLACK_PLAYER))
        pieces.push(new Piece(1, i+1, BLACK_PLAYER))
        pieces.push(new Piece(2, i, BLACK_PLAYER))
        pieces.push(new Piece(5, i+1, WHITE_PLAYER))
        pieces.push(new Piece(6, i, WHITE_PLAYER))
        pieces.push(new Piece(7, i+1, WHITE_PLAYER))
    }
    return pieces;
}




// Create chekers board
function createCheckersBoard() {
    // Create background
    background = document.createElement('div');
    document.body.appendChild(background);
    background.classList.add("background");

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

        }
    }
    boardData = new BoardData(piecesOnBoard());
}

// Call the function who crate the board
window.addEventListener('load', createCheckersBoard);