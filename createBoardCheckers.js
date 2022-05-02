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

        WhoWin = document.createElement('div');
        textNodeWinnerText = document.createTextNode("w");
        WhoWin.appendChild(textNodeWinnerText);
        WhoWin.className = "out";
        table.appendChild(WhoWin);

    }
    boardData = new BoardData(piecesOnBoard());
}

// Call the function who crate the board
window.addEventListener('load', createCheckersBoard);