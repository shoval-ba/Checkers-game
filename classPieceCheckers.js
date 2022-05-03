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
        this.CanEat = false;
        this.player = player;
        this.deleted = false;
        this.initializePiece();

    }

    // Add the pieces to the cell 
    appendPiece() {

        const cell = table.rows[this.row].cells[this.col];
        if (this.player === WHITE_PLAYER) {
            cell.appendChild(this.pieceWhite);

        }
        if (this.player === BLACK_PLAYER) {
            cell.appendChild(this.pieceBlack);
        }
    }

    // Add the pieces
    initializePiece() {
        this.pieceWhite = document.createElement('div');
        this.pieceWhite.classList.add ("pieceWhite") ;
        this.pieceBlack = document.createElement('div');
        this.pieceBlack.classList.add("pieceBlack");
        this.appendPiece();
    }

    // Add icon of crown
    addIcon(){
        this.icon = document.createElement('div');
        this.icon.classList.add ("gg-crown") ;
        if (this.player === WHITE_PLAYER) {
            this.pieceWhite.appendChild(this.icon);

        }
        if (this.player === BLACK_PLAYER) {
            this.pieceBlack.appendChild(this.icon);

        }
    }

     // If piece get to end
     getToEnd() {
        if (this.player === WHITE_PLAYER && this.row === 8) {
            this.addIcon()
        }
        if (this.player === BLACK_PLAYER && this.row === 7) {
            this.addIcon()
        }
    }

    // Change location of the piece
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
        this.pieceWhite.remove()
        this.pieceBlack.remove()
        this.deleted = true;
        this.row = -10;
        this.col = -10;
    }

    // possible moves of black and white pieces
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

    // If the cell exist on the board
    isExist(row, col) {
        return -1 < row && row < 8 && -1 < col && col < 8
    }

    // Black piece possible moves
    blackMoves() {
        let moves = [];
        let locationOccupied;
        let isOccupied;
        let locationOccupied2;
        let isOccupied2;
        let locationOccupied3;
        let isOccupied3;
        let locationOccupied4;
        let isOccupied4;
        let canMove = true;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row + 1, col + 1);
        isOccupied = boardData.getPiece(row + 2, col + 2);

        locationOccupied2 = boardData.getPiece(row + 3, col + 3);
        isOccupied2 = boardData.getPiece(row + 4, col + 4);

        locationOccupied3 = boardData.getPiece(row + 3, col + 1);
        isOccupied3 = boardData.getPiece(row + 4, col);

        locationOccupied4 = boardData.getPiece(row + 1, col + 3);
        isOccupied4 = boardData.getPiece(row , col + 4);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied && this.isExist(row + 2, col + 2)) {
            moves.push([row + 2, col + 2]);
            canMove = false
            if (locationOccupied2 && locationOccupied2.player !== this.player && !isOccupied2 && this.isExist(row + 4, col + 4)) {
                moves.push([row + 4, col + 4]);
            }
            if (locationOccupied3 && locationOccupied3.player !== this.player && !isOccupied3 && this.isExist(row + 4, col)) {
                moves.push([row + 4, col]);
            }
            if (locationOccupied4 && locationOccupied4.player !== this.player && !isOccupied4 && this.isExist(row , col + 4)) {
                moves.push([row, col + 4]);
            }
        }

        locationOccupied = boardData.getPiece(row + 1, col - 1);
        isOccupied = boardData.getPiece(row + 2, col - 2);

        locationOccupied2 = boardData.getPiece(row + 3, col - 3);
        isOccupied2 = boardData.getPiece(row + 4, col - 4);

        locationOccupied3 = boardData.getPiece(row + 3, col - 1);
        isOccupied3 = boardData.getPiece(row + 4, col);

        locationOccupied4 = boardData.getPiece(row + 1, col - 3);
        isOccupied4 = boardData.getPiece(row , col - 4);


        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied && this.isExist(row + 2, col - 2)) {
            moves.push([row + 2, col - 2]);
            canMove = false
            if (locationOccupied2 && locationOccupied2.player !== this.player && !isOccupied2 && this.isExist(row + 4, col - 4)) {
                moves.push([row + 4, col - 4]);
            }
            if (locationOccupied3 && locationOccupied3.player !== this.player && !isOccupied3 && this.isExist(row + 4, col)) {
                moves.push([row + 4, col]);
            }
            if (locationOccupied4 && locationOccupied4.player !== this.player && !isOccupied4 && this.isExist(row , col - 4)) {
                moves.push([row, col - 4]);
            }
        }

        if (!locationOccupied && canMove === true){
            moves.push([row + 1, col - 1]);
        }
        locationOccupied = boardData.getPiece(row + 1, col + 1);
        if (!locationOccupied && canMove === true) {
            moves.push([row + 1, col + 1]);
        }


        moves = moves.filter((move) => {
            if (this.isExist(move[0], move[1])) {
                return true;
            }
        })

        return moves
    }

    // White piece possible moves
    whiteMoves() {
        let moves = [];
        let locationOccupied;
        let isOccupied;
        let locationOccupied2;
        let isOccupied2;
        let locationOccupied3;
        let isOccupied3;
        let locationOccupied4;
        let isOccupied4;
        let canMove = true;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        isOccupied = boardData.getPiece(row - 2, col + 2);

        locationOccupied2 = boardData.getPiece(row - 3, col + 3);
        isOccupied2 = boardData.getPiece(row - 4, col + 4);

        locationOccupied3 = boardData.getPiece(row - 3, col + 1);
        isOccupied3 = boardData.getPiece(row - 4, col);

        locationOccupied4 = boardData.getPiece(row - 1, col + 3);
        isOccupied4 = boardData.getPiece(row, col + 4);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied && this.isExist(row - 2, col + 2)) {
            moves.push([row - 2, col + 2]);
            canMove = false
            if (locationOccupied2 && locationOccupied2.player !== this.player && !isOccupied2 && this.isExist(row - 4, col + 4)) {
                moves.push([row - 4, col + 4]);
            }
            if (locationOccupied3 && locationOccupied3.player !== this.player && !isOccupied3 && this.isExist(row - 4, col)) {
                moves.push([row - 4, col]);
            }
            if (locationOccupied4 && locationOccupied4.player !== this.player && !isOccupied4 && this.isExist(row, col + 4)) {
                moves.push([row, col + 4]);
            }

        }

        locationOccupied = boardData.getPiece(row - 1, col - 1);
        isOccupied = boardData.getPiece(row - 2, col - 2);

        locationOccupied2 = boardData.getPiece(row - 3, col - 3);
        isOccupied2 = boardData.getPiece(row - 4, col - 4);

        locationOccupied3 = boardData.getPiece(row - 3, col - 1);
        isOccupied3 = boardData.getPiece(row - 4, col);

        locationOccupied4 = boardData.getPiece(row - 1, col - 3);
        isOccupied4 = boardData.getPiece(row, col - 4);


        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied && this.isExist(row - 2, col - 2)) {
            moves.push([row - 2, col - 2]);
            canMove = false
            if (locationOccupied2 && locationOccupied2.player !== this.player && !isOccupied2 && this.isExist(row - 4, col - 4)) {
                moves.push([row - 4, col - 4]);
            }
            if (locationOccupied3 && locationOccupied3.player !== this.player && !isOccupied3 && this.isExist(row - 4, col)) {
                moves.push([row - 4, col]);
            }
            if (locationOccupied4 && locationOccupied4.player !== this.player && !isOccupied4 && this.isExist(row, col - 4)) {
                moves.push([row, col - 4]);
            }
        }

        if (!locationOccupied && canMove === true){
            moves.push([row - 1, col - 1]);
        }

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        if (!locationOccupied && canMove === true) {
            moves.push([row - 1, col + 1]);
        }

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        isOccupied = boardData.getPiece(row - 2, col + 2);

        moves = moves.filter((move) => {
            if (this.isExist(move[0], move[1])) {
                return true;
            }
        })
        return moves
    }

}