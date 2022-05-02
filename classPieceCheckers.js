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
        this.pieceWhite.className = "pieceWhite";
        this.pieceBlack = document.createElement('div');
        this.pieceBlack.className = "pieceBlack";
        this.appendPiece();
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
        this.row = -1;
        this.col = -1;
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
        let canMove = true;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row + 1, col + 1);
        isOccupied = boardData.getPiece(row + 2, col + 2);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row + 2, col + 2]);
            canMove = false
        }

        locationOccupied = boardData.getPiece(row + 1, col - 1);
        isOccupied = boardData.getPiece(row + 2, col - 2);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row + 2, col - 2]);
            canMove = false
        }

        if (!locationOccupied && canMove === true)
            moves.push([row + 1, col - 1]);

        locationOccupied = boardData.getPiece(row + 1, col + 1);
        isOccupied = boardData.getPiece(row + 2, col + 2);

        if (!locationOccupied && canMove === true)
            moves.push([row + 1, col + 1]);



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
        let canMove = true;

        let col = this.col;
        let row = this.row;

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        isOccupied = boardData.getPiece(row - 2, col + 2);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row - 2, col + 2]);
            canMove = false
        }

        locationOccupied = boardData.getPiece(row - 1, col - 1);
        isOccupied = boardData.getPiece(row - 2, col - 2);

        if (locationOccupied && locationOccupied.player !== this.player && !isOccupied) {
            moves.push([row - 2, col - 2]);
            canMove = false
        }

        if (!locationOccupied && canMove === true)
            moves.push([row - 1, col - 1]);

        locationOccupied = boardData.getPiece(row - 1, col + 1);
        isOccupied = boardData.getPiece(row - 2, col + 2);

        if (!locationOccupied && canMove === true)
            moves.push([row - 1, col + 1]);

        moves = moves.filter((move) => {
            if (this.isExist(move[0], move[1])) {
                return true;
            }
        })
        return moves
    }

}