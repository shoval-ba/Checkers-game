class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
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
        let isOccupied;
        piece.MoveLocation(row, col);
        if (pieceOld.piece.player === BLACK_PLAYER) {
            isOccupied = this.getPiece(lastRow + 1, lastCol + 1);
            if (isOccupied && row === lastRow + 2 && col === lastCol + 2) {
                isOccupied.deletePiece()
                deletedWhite += 1;
            }
            isOccupied = this.getPiece(lastRow + 1, lastCol - 1);
            if (isOccupied && row === lastRow + 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                deletedWhite += 1;
            }

        }
        if (pieceOld.piece.player === WHITE_PLAYER) {
            isOccupied = this.getPiece(lastRow - 1, lastCol + 1);
            if (isOccupied && row === lastRow - 2 && col === lastCol + 2) {
                isOccupied.deletePiece();
                deletedBlack += 1;
            }
            isOccupied = this.getPiece(lastRow - 1, lastCol - 1);
            if (isOccupied && row === lastRow - 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                deletedBlack += 1;
            }

        }
    }

    // Check win
    win() {
        let whiteCantMove = 0;
        let blackCantMove = 0;
        let possibleMoves;
        for (let piece of boardData.pieces) {
            if (piece.player === turn) {
                possibleMoves = piece.possibleMoves()
               if(possibleMoves.length === 0){
                   if(turn === BLACK_PLAYER){
                    blackCantMove +=1;
                   } else if(turn === WHITE_PLAYER){
                    whiteCantMove +=1;
                   }
               }
            }
        }
        if (deletedBlack === 12 || blackCantMove === 12 ) {
            winner = WHITE_PLAYER;
        }
        else if (deletedWhite === 12 || whiteCantMove ===12) {
            winner = BLACK_PLAYER;
        }
        return winner
    }

    filterMoveIfCanEat() {
        let possibleMoves;
        whoCanEat = [];
        for (let piece of boardData.pieces) {
            if (piece.player === turn) {
                possibleMoves = piece.possibleMoves();
                for (let possibleMove of possibleMoves) {
                    if ((piece.row - 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row - 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
                        whoCanEat.push(piece)
                        piece.CanEat = true;
                        canMove = true;
                    } else if ((piece.row + 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row + 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
                        whoCanEat.push(piece)
                        piece.CanEat = true;
                        canMove = true;
                    }
                }
            }
        }
    }

}