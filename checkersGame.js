BOARD_SIZE =8;









// Create chekers board
function createChekersBoard() {
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
}

// Call the function who crate the board
window.addEventListener('load', createChekersBoard);