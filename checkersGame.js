const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

let pieces = [];
let table;
let cell;
let selectedCell;
let pieceOld = null;

class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
        this.turn = WHITE_PLAYER;
    }

    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (let piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
        return false;
    }

    // Set location to the piece(on the click function) and delete the other piece if piece he eat him
    setLocation(row, col, piece) {
        const isOccupied = this.getPiece(row, col);
        console.log(this.turn)
        if (isOccupied) {
            isOccupied.deletePiece();
        }
        piece.MoveLocation(row, col);
    }

    // To decide who`s turn
    nextTurn() {
        this.turn = this.turn == WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER;
    }

}

class state {
    constructor(piece, cell) {
        this.piece = piece;
        this.cell = cell;

    }

    getCell() {
        return this.cell
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
        if (this.player === WHITE_PLAYER) {
            cell.appendChild(this.pieceWhite);
        }
        if (this.player === BLACK_PLAYER) {
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

    changeLocation(row, col) {
        this.row = row;
        this.col = col;
    }

    // Change the loction and the image of the piece
    MoveLocation(row, col) {
        this.changeLocation(row, col);
        this.appendPiece();
    }

    // Delete piece from the board
    deletePiece() {

        this.pieceBlack.remove();
        this.deleted = true;
        this.row = -1;
        this.col = -1;

    }


    possibleMoves() {
        let filteredMoves = [];
        if (this.player === BLACK_PLAYER) {
            filteredMoves = this.blackMoves();
        } else if (this.player === WHITE_PLAYER) {
            filteredMoves = this.whiteMoves();
        } else {
            console.log("Unknown type");
        }
        return filteredMoves
    }

    isExist(row, col) {
        return -1 < row && row < 8 && -1 < col && col < 8
    }

    blackMoves() {
        let moves = [];
        let locationOccupied;
        let isOccupied;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row + 1, col + 1);
        isOccupied = boardData.getPiece(row + 2, col + 2);
        if (!locationOccupied && locationOccupied.player !== this.player) {
            moves.push([row + 1, col + 1]);
        }
        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row + 2, col + 2]);
        }

        locationOccupied = boardData.getPiece(row + 1, col - 1);
        isOccupied = boardData.getPiece(row + 2, col + 2);
        if (!locationOccupied && locationOccupied.player !== this.player) {
            moves.push([row + 1, col - 1]);
        }

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row + 2, col - 2]);
        }

        moves = moves.filter((move) => {
            if (this.isExist(move[0], move[1])) {
                return true;
            }
        })
        return moves
    }

    whiteMoves() {
        let moves = [];
        let locationOccupied;
        let isOccupied;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        isOccupied = boardData.getPiece(row - 2, col + 2);
        if (!locationOccupied && locationOccupied.player !== this.player) {
            moves.push([row - 1, col + 1]);
        }

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row - 2, col + 2]);
        }

        locationOccupied = boardData.getPiece(row - 1, col - 1);
        isOccupied = boardData.getPiece(row - 2, col - 2);
        if (!locationOccupied && locationOccupied.player !== this.player) {
            moves.push([row - 1, col - 1]);
        }

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row - 2, col - 2]);
        }

        moves = moves.filter((move) => {
            if (this.isExist(move[0], move[1])) {
                return true;
            }
        })
        return moves
    }

}


// When you click on some piece
function onCellClick(event, row, col) {

    // Move the pieces
    if (pieceOld !== null) {
        let newLocation = event.currentTarget;
        if (newLocation.classList.contains('possible-move')) {
            boardData.setLocation(row, col, pieceOld.piece);
        }
        pieceOld = null;
    }

    // Delete the selected cell when you select another cell
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
            table.rows[i].cells[j].classList.remove('selected');
        }
    }

    // background to the selected cell
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    boardData.nextTurn()
    // Show possible moves to the black player when it`s turn
    for (let piece of boardData.pieces) {
        if (piece.row === row && piece.col === col && !piece.deleted) {
            if (piece.player === WHITE_PLAYER ) {
                pieceOld = new state(piece, selectedCell);
                console.log(pieceOld)
                let possibleMoves = piece.possibleMoves();
                for (let possibleMove of possibleMoves) {
                    table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                }
            }
        }
    }

    for (let piece of boardData.pieces) {
        if (piece.row === row && piece.col === col && !piece.deleted) {
            if (piece.player === BLACK_PLAYER) {
                pieceOld = new state(piece, selectedCell);
                console.log(pieceOld)
                let possibleMoves = piece.possibleMoves();
                for (let possibleMove of possibleMoves) {
                    table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                }
            }
        }
    }

}





// Add the pieces
function piecesOnBoard() {
    let pieces = [];
    for (i = 0; i < 8; i += 2) {
        pieces.push(new Piece(0, i, BLACK_PLAYER))
        pieces.push(new Piece(1, i + 1, BLACK_PLAYER))
        pieces.push(new Piece(2, i, BLACK_PLAYER))
        pieces.push(new Piece(5, i + 1, WHITE_PLAYER))
        pieces.push(new Piece(6, i, WHITE_PLAYER))
        pieces.push(new Piece(7, i + 1, WHITE_PLAYER))
    }
    return pieces;
}




// Create chekers board
function createCheckersBoard() {
    // Create background
    background = document.createElement('div');
    document.body.appendChild(background);
    background.classList.add("background");

    // Create a title
    heading = document.createElement('H1');
    textNode = document.createTextNode("Chechers game");
    heading.appendChild(textNode);
    background.appendChild(heading);
    heading.classList.add("h1");

    // Create white turn/black turn
    turnText = document.createElement('H1');
    textNodeTurnText = document.createTextNode("white turn");
    turnText.appendChild(textNodeTurnText);
    background.appendChild(turnText);
    turnText.classList.add("turn");

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
    }
    boardData = new BoardData(piecesOnBoard());
}

// Call the function who crate the board
window.addEventListener('load', createCheckersBoard);