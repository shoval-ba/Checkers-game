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

    // Set location to the piece(on the onClick function) and delete the other piece if the piece captured him
    setLocation(row, col, piece) {
        let isOccupied;
        let isOccupied2;
        let isOccupied3;
        let isOccupied4;
        piece.MoveLocation(row, col);
        if (pieceOld.piece.player === BLACK_PLAYER) {
            isOccupied = this.getPiece(lastRow + 1, lastCol + 1);
            isOccupied2 = this.getPiece(lastRow + 3, lastCol + 3);
            isOccupied3 = this.getPiece(lastRow + 3, lastCol + 1);
            isOccupied4 = this.getPiece(lastRow + 1, lastCol + 3);
            if (isOccupied && row === lastRow + 2 && col === lastCol + 2) {
                isOccupied.deletePiece();
                deletedWhite += 1;
            }
            if (isOccupied2 && row === lastRow + 4 && col === lastCol + 4) {
                isOccupied2.deletePiece();
                isOccupied.deletePiece();
                deletedWhite += 2;
            }
            if (isOccupied3 && row === lastRow + 4 && col === lastCol) {
                isOccupied3.deletePiece();
                isOccupied.deletePiece();
                deletedWhite += 2;
            }
            if (isOccupied4 && row === lastRow  && col === lastCol + 4) {
                isOccupied4.deletePiece();
                isOccupied.deletePiece();
                deletedWhite += 2;
            }

            isOccupied = this.getPiece(lastRow + 1, lastCol - 1);
            isOccupied2 = this.getPiece(lastRow + 3, lastCol - 3);
            isOccupied3 = this.getPiece(lastRow + 3, lastCol - 1);
            isOccupied4 = this.getPiece(lastRow + 1, lastCol - 3);
            if (isOccupied && row === lastRow + 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                deletedWhite += 1;
            }
            if (isOccupied2 && row === lastRow + 4 && col === lastCol - 4) {
                isOccupied.deletePiece();
                isOccupied2.deletePiece();
                deletedWhite += 2;
            }
            if (isOccupied3 && row === lastRow + 4 && col === lastCol) {
                isOccupied3.deletePiece();
                isOccupied.deletePiece();
                deletedWhite += 2;
            }
            if (isOccupied4 && row === lastRow  && col === lastCol - 4) {
                isOccupied4.deletePiece();
                isOccupied.deletePiece();
                deletedWhite += 2;
            }

        }
        if (pieceOld.piece.player === WHITE_PLAYER) {
            isOccupied = this.getPiece(lastRow - 1, lastCol + 1);
            isOccupied2 = this.getPiece(lastRow - 3, lastCol + 3);
            isOccupied3 = this.getPiece(lastRow - 3, lastCol + 1);
            isOccupied4 = this.getPiece(lastRow - 1, lastCol + 3);
            if (isOccupied && row === lastRow - 2 && col === lastCol + 2) {
                isOccupied.deletePiece();
                deletedBlack += 1;
            }
            if (isOccupied2 && row === lastRow - 4 && col === lastCol + 4) {
                isOccupied2.deletePiece();
                isOccupied.deletePiece();
                deletedBlack += 2;
            }
            if (isOccupied3 && row === lastRow - 4 && col === lastCol) {
                isOccupied3.deletePiece();
                isOccupied.deletePiece();
                deletedBlack += 2;
            }
            if (isOccupied4 && row === lastRow  && col === lastCol + 4) {
                isOccupied4.deletePiece();
                isOccupied.deletePiece();
                deletedBlack += 2;
            }

            isOccupied = this.getPiece(lastRow - 1, lastCol - 1);
            isOccupied2 = this.getPiece(lastRow - 3, lastCol - 3);
            isOccupied3 = this.getPiece(lastRow - 3, lastCol - 1);
            isOccupied4 = this.getPiece(lastRow - 1, lastCol - 3);
            if (isOccupied && row === lastRow - 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                deletedBlack += 1;
            }
            if (isOccupied2 && row === lastRow - 4 && col === lastCol - 4) {
                isOccupied.deletePiece();
                isOccupied2.deletePiece();
                deletedBlack += 2;
            }
            if (isOccupied3 && row === lastRow - 4 && col === lastCol) {
                isOccupied3.deletePiece();
                isOccupied.deletePiece();
                deletedBlack += 2;
            }
            if (isOccupied4 && row === lastRow  && col === lastCol - 4) {
                isOccupied4.deletePiece();
                isOccupied.deletePiece();
                deletedBlack += 2;
            }
        }

    }

    // Check winning
    win() {
        let whiteCantMove = 0;
        let blackCantMove = 0;
        let possibleMoves;
        for (let piece of boardData.pieces) {
            if (piece.player === turn) {
                possibleMoves = piece.possibleMoves();
                if (possibleMoves.length === 0) {
                    if (turn === BLACK_PLAYER) {
                        blackCantMove += 1;
                    } else if (turn === WHITE_PLAYER) {
                        whiteCantMove += 1;
                    }
                }
            }
        }
        if (deletedBlack === 12 || blackCantMove === 12) {
            winner = WHITE_PLAYER;
        }
        else if (deletedWhite === 12 || whiteCantMove === 12) {
            winner = BLACK_PLAYER;
        }
        return winner;
    }

    // Block the possible moves if some piece can capture
    filterMoveIfCanEat() {
        let possibleMoves;
        whoCanEat = [];
        for (let piece of boardData.pieces) {
            if (piece.player === turn) {
                possibleMoves = piece.possibleMoves();
                for (let possibleMove of possibleMoves) {
                    if ((piece.row - 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row - 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
                        whoCanEat.push(piece);
                        piece.CanEat = true;
                        canMove = true;
                    } else if ((piece.row + 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row + 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
                        whoCanEat.push(piece);
                        piece.CanEat = true;
                        canMove = true;
                    }
                }
            }
        }
    }


}