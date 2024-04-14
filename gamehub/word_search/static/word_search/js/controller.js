document.addEventListener('DOMContentLoaded', function() {
    const wordElements = document.querySelectorAll('li[data-word]');
    const wordAttributes = Array.from(wordElements).map(el => normalizeWord(el.getAttribute('data-word')));
    console.log('carga de palabras con atributo')
    console.log("palabras de atributo 'data-word':", wordAttributes);





    // const words = ['HOUSE', 'FOOD', 'ROOT', 'SYSTEMS', 'EXPERTS', 'SOUP', 'LETTERS', 'GAME', 'PLAY'];
    const words = [...wordAttributes];
    console.log('carga de palabras estaticas : ', words)
    const gridSize = 10;
    const board = document.getElementById('board');
    // const wordList = document.getElementById('wordList');
    const attemptsOutput = document.querySelector('.attempts output');
    // matriz
    let grid = []; 
    let attempts = 0;
    let foundWords = 0;
  
    initGrid();
    fillGrid();
    displayWords();
  
    function updateAttempts() {
      attempts++;
      attemptsOutput.textContent = attempts;
    }
  
    function checkCompletion() {
      if (foundWords === words.length) {
        alert("Congratulations! All words found!");
      }
    }
  
    function initGrid() {
      for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
          grid[i][j] = { letter: '', element: null, partOfWord: false, x: i, y: j };
        }
      }
    }
  
    function fillGrid() {
      words.forEach(word => {
        let placed = false;
        while (!placed) {
          const direction = Math.floor(Math.random() * 4);
          const startRow = Math.floor(Math.random() * gridSize);
          const startCol = Math.floor(Math.random() * gridSize);
          placed = tryPlaceWord(word, startRow, startCol, direction);
        }
      });
  
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (!grid[i][j].partOfWord) {
            grid[i][j].letter = getRandomLetter();
          }
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.textContent = grid[i][j].letter;
          cell.dataset.x = i;
          cell.dataset.y = j;
          board.appendChild(cell);
          grid[i][j].element = cell;
  
          cell.addEventListener('mousedown', startSelection);
          cell.addEventListener('mouseenter', expandSelection);
          cell.addEventListener('mouseup', endSelection);
        }
      }
    }
  
    function tryPlaceWord(word, row, col, dir) {
      let coords = [];
      for (let i = 0; i < word.length; i++) {
        let newRow = row;
        let newCol = col;
  
        if (dir === 0) newCol += i; // horizontal
        if (dir === 1) newRow += i; // vertical
        if (dir === 2) { newRow += i; newCol += i; } // diagonal derecho
        if (dir === 3) { newRow += i; newCol -= i; } // diagonal izquierdo
  
        if (newCol < 0 || newCol >= gridSize || newRow < 0 || newRow >= gridSize || grid[newRow][newCol].partOfWord) {
          return false;
        }
        coords.push({ row: newRow, col: newCol });
      }
  
      coords.forEach((coord, index) => {
        grid[coord.row][coord.col].letter = word[index];
        grid[coord.row][coord.col].partOfWord = true;
      });
  
      return true;
    }
  
    function getRandomLetter() {
      return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  
    let currentSelection = [];
    let selecting = false;
    let lastSelected = null;
  
    function areAdjacent(cell1, cell2) {
      const dx = Math.abs(cell1.dataset.x - cell2.dataset.x);
      const dy = Math.abs(cell1.dataset.y - cell2.dataset.y);
      return dx <= 1 && dy <= 1;
    }
  
    function startSelection(event) {
      if (!selecting) {
        selecting = true;
        currentSelection = [event.target];
        lastSelected = event.target;
        event.target.classList.add('selected');
        // updateAttempts();
      }
    }
  
    function expandSelection(event) {
      if (selecting && areAdjacent(lastSelected, event.target) && !currentSelection.includes(event.target)) {
        currentSelection.push(event.target);
        event.target.classList.add('selected');
        lastSelected = event.target;
      }
    }
  
    function endSelection(event) {
      selecting = false;
      const selectedWord = currentSelection.map(el => el.textContent).join('');
      if (words.includes(selectedWord)) {
        currentSelection.forEach(el => el.classList.add('found'));
        const wordElement = document.querySelector(`li[data-word="${selectedWord}"]`);
        if (wordElement && !wordElement.classList.contains('found')) {
          wordElement.classList.add('found');
          foundWords++;
          checkCompletion();
        }
      } else {
        currentSelection.forEach(el => el.classList.remove('selected'));
      }
      updateAttempts();
      currentSelection = [];
      lastSelected = null;
    }
  
    function displayWords() {
      words.forEach(word => {
        const wordElement = document.createElement('li');
        wordElement.textContent = word;
        wordElement.dataset.word = word;
        // wordList.appendChild(wordElement);
      });
    }
  });
  

function normalizeWord(word) {
  return word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .trim()
      .toUpperCase();
}

