function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createBoard() {
    var board = [];
    var cell = {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
    }
    for (var i = 0; i < 4; i++) {
        board.push([])
        for (var j = 0; j < 4; j++) {
            board[i][j] = cell
        }
    }




    return board;
}
function renderBoard(board) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            // console.log(board[i][j]);
            var cell = board[i][j];
            var className = (cell.isMine === true) ? 'mine' : 'num'
            strHTML += `<td data-i="${i}" data-j="${j}"
            onclick="cellClicked(this , ${i},${j})" 
            class="${className}">${cell}</td>`
        }

        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}

// function printMat(mat, selector) {
//     var strHTML = '<table border="0"><tbody>';
//     for (var i = 0; i < mat.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < mat[0].length; j++) {
//             var cell = mat[i][j];
//             var className = 'cell cell' + i + '-' + j;
//             strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
// }

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}
