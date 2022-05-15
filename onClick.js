
// When you click on some cell.
function onCellClick(event, row, col) {

    // Move the piece to the cell on second click.
    if (pieceOld !== null) {
        let newLocation = event.currentTarget;
        if (newLocation.classList.contains('possible-move')) {

            if (pieceOld.piece.player === WHITE_PLAYER) {
                turnText.textContent = "black turn";
                turn = BLACK_PLAYER;
            }
            else {
                turnText.textContent = "white turn";
                turn = WHITE_PLAYER;
            }

            boardData.setLocation(row, col, pieceOld.piece);

            // If some piece get to the end of the board.
            pieceOld.piece.getToEnd();
        }
        pieceOld = null;
    }

    // Delete the selected cell when you select another cell.
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
            table.rows[i].cells[j].classList.remove('selected');
        }
    }

    // Background to the selected cell.
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    boardData.filterMoveIfCanEat();

    // Show possible moves to the player when it`s turn.
    for (let piece of boardData.pieces) {
        if (piece.player !== turn) continue;
        if (piece.row === row && piece.col === col && !piece.deleted) {
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
                    }
                }
            }

        }
    }


    // Show who won.
    boardData.win();

    if (winner === WHITE_PLAYER) {
        whoWin.textContent = "The white player won";
        whoWin.classList.remove("out");
        whoWin.classList.add("winner");
        for (let piece of boardData.pieces) {
            let possibleMoves = piece.possibleMoves();
            possibleMoves = [];
        }
    }
    else if (winner === BLACK_PLAYER) {
        whoWin.textContent = "The black player won";
        whoWin.classList.remove("out");
        whoWin.classList.add("winner");
        for (let piece of boardData.pieces) {
            let possibleMoves = piece.possibleMoves();
            possibleMoves = [];
        }
    }

}





