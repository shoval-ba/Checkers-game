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






// When you click on some piece
function onCellClick(event, row, col) {

    // Move the pieces
    if (pieceOld !== null) {
        let newLocation = event.currentTarget;
        if (newLocation.classList.contains('possible-move')) {

            if (pieceOld.piece.player === WHITE_PLAYER) {
                turnText.textContent = "black turn";
                turn = BLACK_PLAYER
            }
            else {
                turnText.textContent = "white turn";
                turn = WHITE_PLAYER
            }

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

    boardData.filterMoveIfCanEat();

    // Show possible moves to the white player when it`s turn
    for (let piece of boardData.pieces) {
        if (piece.row === row && piece.col === col && !piece.deleted) {
            if (piece.player === WHITE_PLAYER && turn === WHITE_PLAYER) {
                if (whoCanEat.length === 0) {
                    pieceOld = new state(piece, selectedCell);
                    lastRow = pieceOld.piece.row;
                    lastCol = pieceOld.piece.col;
                    let possibleMoves = piece.possibleMoves();
                    for (let possibleMove of possibleMoves) {
                        table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                    }
                } else {
                    for (canEat of whoCanEat) {
                        pieceOld = new state(piece, selectedCell);
                        if (pieceOld.piece === canEat) {
                            lastRow = pieceOld.piece.row;
                            lastCol = pieceOld.piece.col;
                            let possibleMoves = canEat.possibleMoves();
                            for (let possibleMove of possibleMoves) {
                                table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                            }
                        } else
                            console.log("cant move")
                    }
                }
            }
        }
    }

    // Show possible moves to the black player when it`s turn
    for (let piece of boardData.pieces) {
        if (piece.row === row && piece.col === col && !piece.deleted) {
            if (piece.player === BLACK_PLAYER && turn === BLACK_PLAYER) {
                if (whoCanEat.length === 0) {
                    pieceOld = new state(piece, selectedCell);
                    lastRow = pieceOld.piece.row;
                    lastCol = pieceOld.piece.col;
                    let possibleMoves = piece.possibleMoves();
                    for (let possibleMove of possibleMoves) {
                        table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                    }
                } else {
                    for (canEat of whoCanEat) {
                        pieceOld = new state(piece, selectedCell);
                        if (pieceOld.piece === canEat) {
                            lastRow = pieceOld.piece.row;
                            lastCol = pieceOld.piece.col;
                            let possibleMoves = canEat.possibleMoves();
                            for (let possibleMove of possibleMoves) {
                                table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
                            }
                        } else
                            console.log("cant move")
                    }
                }
            }
        }
    }
    boardData.win()
    if (winner === WHITE_PLAYER) {
        whoWin.textContent = "The white player won";
        whoWin.classList.remove("out");
        whoWin.classList.add("winner");
        for (let piece of boardData.pieces) {
            let possibleMoves = piece.possibleMoves();
            possibleMoves = null;
        }
    }
    else if (winner === BLACK_PLAYER) {
        whoWin.textContent = "The black player won";
        whoWin.classList.remove("out");
        whoWin.classList.add("winner");
        for (let piece of boardData.pieces) {
            let possibleMoves = piece.possibleMoves();
            possibleMoves = null;
        }
    }
}





