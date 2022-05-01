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
                piecesWhite +=1;
            }
            isOccupied = this.getPiece(lastRow + 1, lastCol - 1);
            if (isOccupied && row === lastRow + 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                piecesWhite +=1;
            }
            
            console.log("white" ,piecesWhite)
        }
        if (pieceOld.piece.player === WHITE_PLAYER) {
            isOccupied = this.getPiece(lastRow - 1, lastCol + 1);
            if (isOccupied && row === lastRow - 2 && col === lastCol + 2) {
                isOccupied.deletePiece();
                piecesBlack +=1;
            }
            isOccupied = this.getPiece(lastRow - 1, lastCol - 1);
            if (isOccupied && row === lastRow - 2 && col === lastCol - 2) {
                isOccupied.deletePiece();
                piecesBlack +=1;
            }
            
            console.log("black" ,piecesBlack)
        }
        // console.log(piece.deletePiece())
    }

    filterMoveIfCanEat() {
        let possibleMoves;
        for (let piece of boardData.pieces) {
            if (piece.player === WHITE_PLAYER) {
                possibleMoves = piece.possibleMoves();
                for (let possibleMove of possibleMoves) {
                    if ((piece.row - 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row - 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
                        console.log("can eat")
                        if (piece.possibleMoves.contains([possibleMove[0], possibleMove[1]])) {
                            console.log("can move there")
                            possibleMoves = [possibleMove[0], possibleMove[1]]
                        }
                        console.log(possibleMoves)
                    }
                    else {
                        console.log("not in")
                        console.log(possibleMoves)

                    }

                    return possibleMoves
                }
            }
            // if (piece.player === BLACK_PLAYER) {
            //     possibleMoves = piece.possibleMoves();
            //     for (let possibleMove of possibleMoves) {
            //         if ((piece.row + 2 === possibleMove[0] && piece.col - 2 === possibleMove[1]) || (piece.row + 2 === possibleMove[0] && piece.col + 2 === possibleMove[1])) {
            //             console.log("can eat")
            //             possibleMoves = [possibleMove[0], possibleMove[1]]
            //             console.log(possibleMoves)
            //         }
            //         else {
            //             console.log("not in")
            //         }
            //     }

            // }
        }
        console.log(possibleMoves)

    }

}