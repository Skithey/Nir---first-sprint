'use strict'


var gBoard = [];
var gGame;
var gLevel = {
    size: 4,
    mines: 2
}
var seconds = 0;
var setIntervalId;
var clickCount = 0;

function startTimer() {
    setIntervalId = setInterval(function () {
        var elTimer = document.querySelector('.timer');
        seconds++;
        elTimer.innerText = ` ${seconds}`;
        // if (milisec === 99) {
        //     milisec = 0;

        // }

    }, 1000);
}

function init() {
    gBoard = createBoard();
    // gBoard[1][1].isMine = true;
    // gBoard[2][2].isMine = true;
    renderBoard(gBoard);

}

function createBoard() {
    //create board//
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell;
        }
    }
    // create mines//
    for (var i = 0; i < gLevel.mines; i++) {
        var row = getRandomIntInclusive(0, 3);
        var col = getRandomIntInclusive(0, 3);
        if (board[row][col].isMine === true) {
            i--
            continue;
        }
        board[row][col].isMine = true;
    }
    //create negs//
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
        }
    }
    return board;
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine === true) minesCount++;
        }
    }
    return minesCount;
}

function renderBoard(board) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell'
            var isMine = (cell.isMine) ? '*' : cell.minesAroundCount;
            var isShown = (cell.isShown) ? isMine : '';
            // console.log(setMinesNegsCount(gBoard, i, j))
            strHTML += `<td data-i="${i}" data-j="${j}"
            onmousedown="isClicked(this, ${i},${j}, event)"
            class="${className}">${isShown}</td>`
        }
        strHTML += '</tr>';
        // console.log(gBoard)
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
function isClicked(elCell, i, j, ev) {
    if (ev.button === 0) cellClicked(elCell, i, j);
    if (ev.button === 2) cellMarked(elCell, i, j);
    clickCount++;
    if (clickCount === 1) startTimer();

}

function cellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true;
    if (gBoard[i][j].isMarked === true) {
        return;
    }
    if (!gBoard[i][j].isMine) {
        elCell.innerText = gBoard[i][j].minesAroundCount;
    } else {
        elCell.innerText = '💥';
    }
    console.log(gBoard[i][j])
    checkGameOver(i, j);
}

function cellMarked(elCell, i, j) {
    if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
        elCell.innerText = '🚩';
        gBoard[i][j].isMarked = true;
    } else if (gBoard[i][j].isMarked) {
        checkGameOver(i, j);
        gBoard[i][j].isMarked = false;
        elCell.innerText = '';
    }
    // console.log(gBoard[i][j])
}

function checkGameOver(posI, posJ) {
    // console.log(gBoard[i][j])
    if (!gBoard[posI][posJ].isMine) {
        if (!gBoard[posI][posJ].isShown) {
            return
        }
    } else if (gBoard[posI][posJ].isMine) {
        if (!gBoard[posI][posJ].isMarked) {
            console.log('Game Over')
            return
        }
    }


//make u win console and u lose console jump in the right place //

}

