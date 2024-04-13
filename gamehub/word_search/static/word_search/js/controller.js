
  /**---------------------------------Inicialización de Variables y Arreglos --------------------------------*/

//trae la variable de contexto de la vista con la lista de palabras
var palabritas = "{{ palabras }}";
palabritas = palabritas.replace(/&quot;/g, '"');
palabritas = JSON.parse(palabritas);
console.log(palabritas.length);

var palabras = ['CASA', 'COMIDA', 'RAIZ', 'SISTEMAS', 'EXPERTOS', 'SOPA', 'LETRAS']; 



const gridTam = 10; // Tamaño del grid
const sopa = document.getElementById('sopa');
const listaPalabras = document.getElementById('listaPalabras');
let palabSelec = '';
let grid = []; // Almacenar la cuadrícula de letras



/**----------------------------------------Llenado de la Sopa de Letras -----------------------------------*/
// Función para inicializar la cuadrícula de letras
function inicGrid() {
    for (let i = 0; i < gridTam; i++) {
      grid[i] = [];
      for (let j = 0; j < gridTam; j++) {
        grid[i][j] = {
          letra: '', // Inicializar cada celda con una cadena vacía
          elemento: null
        };
      }
    }
  }
  

// Función para obtener una letra aleatoria
function letraRandom() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

// Función para verificar si una palabra o su reverso está en la lista de palabras
function palEnLista(pal) {
   
    return palabras.includes(pal);
    
  }
  
  // Función para revertir una cadena de texto
  function reverseString(str) {
    return str.split('').reverse().join('');
  }


// Función para generar la sopa de letras
function generarSopa() {
    inicGrid();
  
    // Insertar palabras en la cuadrícula
    for (const pal of palabras) {
      let puesto = false;
      while (!puesto) {
        const fila = Math.floor(Math.random() * gridTam);
        const col = Math.floor(Math.random() * gridTam);
        const dirIndi = Math.floor(Math.random() * 8);
        const dir = [
          [-1, 0], // arriba
          [-1, 1], // diagonal superior derecha
          [0, 1],  // derecha
          [1, 1],  // diagonal inferior derecha
          [1, 0],  // abajo
          [1, -1], // diagonal inferior izquierda
          [0, -1], // izquierda
          [-1, -1] // diagonal superior izquierda
        ][dirIndi];
  
        if (verLugarPal(pal, fila, col, dir)) {
          lugarPal(pal, fila, col, dir);
          puesto = true;
          break;
        }
      }
    }
  
    for (let i = 0; i < gridTam; i++) {
      for (let j = 0; j < gridTam; j++) {
        if(grid[i][j].letra==''){
          grid[i][j].letra = letraRandom();
        }
        
      }
    }
    // Renderizar la cuadrícula en el DOM
    for (let i = 0; i < gridTam; i++) {
      for (let j = 0; j < gridTam; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.fila = i;
        cell.dataset.col = j;
        cell.dataset.letra = grid[i][j].letra;
        cell.textContent = grid[i][j].letra;
        cell.addEventListener('mousedown', handleMouseDown);
        sopa.appendChild(cell);
        grid[i][j].elemento = cell;
      }
    }
  }
  
  // Función para verificar si una palabra puede ser colocada en una posición específica
  function verLugarPal(pal, fila, col, dir) {
    const len = pal.length;
    const fFila = fila + dir[0] * (len - 1);
    const fCol = col + dir[1] * (len - 1);
  
    if (fFila < 0 || fFila >= gridTam || fCol < 0 || fCol >= gridTam) {
      return false;
    }
  
    for (let i = 0; i < len; i++) {
      const f = fila + dir[0] * i;
      const c = col + dir[1] * i;
      if (grid[f][c].letra !== '' && grid[f][c].letra !== pal[i]) {
        return false;
      }
    }
  
    return true;
  }
  
  // Función para colocar una palabra en una posición específica
  function lugarPal(pal, fila, col, dir) {
    const len = pal.length;
    for (let i = 0; i < len; i++) {
      const f = fila + dir[0] * i;
      const c = col + dir[1] * i;
      grid[f][c].letra = pal[i];
    }
  }
  
  

// Función para generar la lista de palabras
function generarListaPalabras() {
    for (const pal of palabras) {
      const listItem = document.createElement('li');
      listItem.textContent = pal;
      listItem.dataset.pal = pal;
      listaPalabras.appendChild(listItem);
    }
  }

  inicGrid();
  generarListaPalabras();
  generarSopa();
/**------------------------------------Interacción con el Usuario---------------------------------------- */

let seleccionActual = []; // Almacenar la selección actual del usuario

// Manejador de evento para el mouse abajo en el contenedor de la sopa de letras
sopa.addEventListener('mousedown', handleMouseDown);

// Función para manejar el evento de selección de letras
function handleMouseDown(event) {
  sopa.addEventListener('mousemove', handleMouseMove);
  sopa.addEventListener('mouseup', handleMouseUp);
}

// Función para manejar el evento de movimiento del mouse
function handleMouseMove(event) {
  const target = event.target;
  if (target.classList.contains('cell')) {
    const fila = parseInt(target.dataset.fila);
    const col = parseInt(target.dataset.col);
    const letra = target.dataset.letra;
    
    // Verificar si la celda ya está seleccionada
    const index = seleccionActual.findIndex(item => item.fila === fila && item.col === col);
    if (index === -1) {
      // Si no está seleccionada, la agregamos a la selección actual
      target.classList.add('selected');
      agregarLetraSeleccionada({ fila, col, letra });
    }
  }
}

// Función para manejar el evento de mouse arriba
function handleMouseUp(event) {
  sopa.removeEventListener('mousemove', handleMouseMove);
  sopa.removeEventListener('mouseup', handleMouseUp);
  
  const palabraSeleccionada = seleccionActual.reduce((acc, curr) => acc + curr.letra, ''); // Concatenar letras para formar una palabra
  
  if (palEnLista(palabraSeleccionada)) { // Verificar si la palabra está en la lista
    // Resaltar y tachar la palabra en la lista
    const palabraListElement = document.querySelector(`li[data-pal="${palabraSeleccionada}"]`);
    palabraListElement.classList.add('strikethrough');
    seleccionActual.forEach(cell => {
      const elemento = grid[cell.fila][cell.col].elemento;
      elemento.classList.add('selected2');
      //elemento.classList.add('strikethrough');
    });
  } else {
    // Si la palabra no está en la lista, quitar el resaltado de las celdas seleccionadas
    seleccionActual.forEach(cell => {
      const elemento = grid[cell.fila][cell.col].elemento;
      elemento.classList.remove('selected');
    });
  }
  
  seleccionActual = []; // Reiniciar la selección actual
}

// Función para agregar una letra seleccionada a la lista de selección actual
function agregarLetraSeleccionada(letra) {
  seleccionActual.push(letra);
}

// ##################33



// Define la función que quieres ejecutar
function repetirCadaSegundo() {
  console.log('Se ejecuta cada segundo');
}

// Establece el intervalo para llamar a la función cada 1000 milisegundos (1 segundo)
const intervalo = setInterval(repetirCadaSegundo, 1000);

// Opcional: Código para detener el intervalo después de 10 segundos
setTimeout(() => {
  clearInterval(intervalo);
  console.log('Intervalo detenido');
}, 10000);