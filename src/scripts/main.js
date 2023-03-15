'use strict';

const table = document.querySelector('tbody');
const button = document.querySelector('.button');
const cells = table.querySelectorAll('td');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const messageStart = document.querySelector('.message-start');
const rows = table.rows;
const columnsQnt = 4;
let total = 0;
const gameFieldState = [];

function updateGameFieldState() {
  for (const cell of cells) {
    gameFieldState.push(+cell.innerText);
  }
}

function isLooser() {
  let result = false;

  for (let row = 0; row < rows.length; row++) {
    const temp = getArrayFromRow(rows[row]);

    temp.forEach((el, ind, arr) => {
      if (el === arr[ind + 1]) {
        result = true;
      }
    });
  };

  for (let i = 0; i < columnsQnt; i++) {
    const arr = [
      +rows[0].children[i].innerText,
      +rows[1].children[i].innerText,
      +rows[2].children[i].innerText,
      +rows[3].children[i].innerText,
    ];

    arr.forEach((el, ind, ar) => {
      if (el === ar[ind + 1]) {
        result = true;
      };
    });
  }

  if (!hasEmptyCells() && result === false) {
    messageLose.classList.removeCells('hidden');
  };
};

function getArrayFromRow(row) {
  const result = [];

  for (const child of row.children) {
    if (child.innerText === '') {
      result.push(0);
      continue;
    }
    result.push(Number(child.innerText));
  };

  return result;
};

function getRowFromArray(arr, row) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      row.children[i].innerHTML = '';
      continue;
    };

    row.children[i].innerText = arr[i];
  }

  updateStyle();
}

function moveCells(row) {
  let filtered = row.filter(el => el > 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const value = filtered[i] * 2;

      total += value;
      filtered[i] = value;
      filtered[i + 1] = 0;
    };
  };

  filtered = filtered.filter(el => el > 0);

  while (filtered.length < columnsQnt) {
    filtered.push(0);
  };

  return filtered;
};

function updateStyle() {
  const score = document.querySelector('.game-score');

  score.innerText = `${total}`;

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < columnsQnt; column++) {
      const num = rows[row].children[column].innerText;

      rows[row].children[column].classList.value = '';
      rows[row].children[column].classList.add('field-cell');

      if (num !== '') {
        rows[row].children[column].classList.add(`field-cell--${num}`);
      }
    }
  };
};

function moveCellsLeft() {
  for (const row of rows) {
    let temp = getArrayFromRow(row);

    temp = moveCells(temp);
    getRowFromArray(temp, row);
  };

  addNewCells();
};

function moveCellsRight() {
  for (const row of rows) {
    let temp = getArrayFromRow(row);

    temp.reverse();
    temp = moveCells(temp);
    temp.reverse();
    getRowFromArray(temp, row);
  }
  addNewCells();
}

function getArrayFromColumn(collection, index) {
  return [
    +collection[0].children[index].innerText,
    +collection[1].children[index].innerText,
    +collection[2].children[index].innerText,
    +collection[3].children[index].innerText,
  ];
}

function moveCellsUp() {
  for (let i = 0; i < columnsQnt; i++) {
    const arr = getArrayFromColumn(rows, i);

    const moveCellsd = moveCells(arr);

    [...rows].forEach((row, index) => {
      row.children[i].innerText
        = moveCellsd[index] === 0
          ? ''
          : moveCellsd[index];
    });
  };
  addNewCells();
};

function moveCellsDown() {
  for (let i = 0; i < columnsQnt; i++) {
    const arr = getArrayFromColumn(rows, i);

    arr.reverse();

    const moveCellsd = moveCells(arr);

    moveCellsd.reverse();

    [...rows].forEach((row, index) => {
      row.children[i].innerText
        = moveCellsd[index] === 0
          ? ''
          : moveCellsd[index];
    });
  };
  addNewCells();
}

function startGame() {
  const index1 = findEmptyCell();
  let index2 = findEmptyCell();

  while (index1 === index2) {
    index2 = findEmptyCell();
  }

  cells[index1].innerText = generateNewCellValue();
  cells[index2].innerText = generateNewCellValue();

  updateStyle();
};

function findEmptyCell() {
  const emptyCells = [...cells].filter(cell => cell.innerText === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);

  return [...cells].indexOf(emptyCells[randomIndex]);
}

function generateNewCellValue() {
  let resultCell;
  const probability = Math.random();

  if (probability < 0.1) {
    resultCell = 4;
  } else {
    resultCell = 2;
  }

  return resultCell;
}

function restartGame() {
  for (const cell of cells) {
    cell.innerHTML = '';
    cell.classList.value = '';
    cell.className = 'field-cell';
  }
  total = 0;
  startGame();
};

function addNewCells() {
  if (!hasEmptyCells()) {
    return;
  }

  const tempGameFieldState = [];

  for (const cell of cells) {
    tempGameFieldState.push(+cell.innerText);
  }

  let fieldWasChanged = false;

  for (let i = 0; i < tempGameFieldState.length; i++) {
    if (tempGameFieldState[i] !== gameFieldState[i]) {
      fieldWasChanged = true;
    }
  }

  if (fieldWasChanged) {
    const index = findEmptyCell();

    cells[index].innerText = generateNewCellValue();

    updateStyle();
  }

  gameFieldState.length = 0;

  updateGameFieldState();
};

function hasEmptyCells() {
  for (const cell of cells) {
    if (cell.innerText === '') {
      return true;
    }
  }

  return false;
};

function updateMessage() {
  for (const cell of cells) {
    if (cell.innerText === '2048') {
      messageWin.classList.removeCells('hidden');
    };
  };
};

function handleStartButtonClick(e) {
  e.target.classList.value = '';
  e.target.classList.add('button', 'restart');
  e.target.innerText = 'Restart';
  messageStart.classList.add('hidden');

  startGame();
}

function handleRestartButtonClick(e) {
  e.target.classList.value = '';
  e.target.classList.add('button', 'restart');
  messageLose.classList.add('hidden');

  restartGame();
}

button.addEventListener('click', e => {
  switch (e.target.innerText) {
    case 'Start':
      handleStartButtonClick(e);
      break;
    case 'Restart':
      handleRestartButtonClick(e);
      break;
  };
});

document.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' && button.innerText === 'Restart') {
    moveCellsLeft();
    updateStyle();
    updateMessage();
    isLooser();
  };
});

document.addEventListener('keyup', e => {
  if (e.code === 'ArrowRight' && button.innerText === 'Restart') {
    moveCellsRight();
    updateStyle();
    updateMessage();
    isLooser();
  };
});

document.addEventListener('keyup', e => {
  if (e.code === 'ArrowUp' && button.innerText === 'Restart') {
    moveCellsUp();
    updateStyle();
    updateMessage();
    isLooser();
  };
});

document.addEventListener('keyup', e => {
  if (e.code === 'ArrowDown' && button.innerText === 'Restart') {
    moveCellsDown();
    updateMessage();
    updateStyle();
    isLooser();
  };
});
