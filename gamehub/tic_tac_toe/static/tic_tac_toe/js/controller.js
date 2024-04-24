// controller.js

// Declaración inicial de la variable 'chatSocket'
let chatSocket;

// Esta función se utiliza para iniciar la conexión WebSocket.
function startWebSocket(roomName) {
    chatSocket = new WebSocket(
        `ws://${window.location.host}/ws/tictactoe/${roomName}/`
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);

        if (data.numbers) {
            displayNumbers(data.numbers);
            setStatus(`Números enviados por ${data.username}`);
        }
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
}

// Esta función se utiliza para cerrar la conexión WebSocket.
function stopWebSocket() {
    if (chatSocket) {
        chatSocket.close();
    }
}

// Esta función actualiza la interfaz de usuario con los números recibidos.
function displayNumbers(numbers) {
    const randomNumberList = document.getElementById('random-numbers');
    randomNumberList.innerHTML = numbers.map(number => `<li>${number}</li>`).join('');
}

// Esta función actualiza el estado de la interfaz de usuario.
function setStatus(message) {
    const statusDisplay = document.getElementById('status');
    statusDisplay.textContent = message;
}

// Función para generar números aleatorios y enviarlos a través de WebSocket.
function generateAndSendNumbers() {
    const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    const username = document.getElementById('username').value || 'usuario_anonimo';

    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        chatSocket.send(JSON.stringify({
            action: 'generate',
            numbers: numbers,
            username: username
        }));
    } else {
        console.log('WebSocket is not connected.');
    }
}

// Asociación de eventos a elementos de la interfaz de usuario.
document.addEventListener('DOMContentLoaded', () => {
    const connectedRadio = document.getElementById('connected');
    const disconnectedRadio = document.getElementById('disconnected');
    const generateButton = document.getElementById('generate');

    connectedRadio.addEventListener('change', (event) => {
        if (event.target.checked) {
            const roomName = prompt("Por favor, ingrese el nombre de la sala:");  // O usa un método más sofisticado para obtener el roomName
            startWebSocket(roomName);
        }
    });

    disconnectedRadio.addEventListener('change', (event) => {
        if (event.target.checked) {
            stopWebSocket();
        }
    });

    generateButton.addEventListener('click', generateAndSendNumbers);
});






































































































































































// console.log('jajajaja nooooooooo')


// // Suponiendo que ya tienes una conexión WebSocket 'chatSocket' establecida
// const connectedRadio = document.getElementById('connected');
// const disconnectedRadio = document.getElementById('disconnected');
// const statusDisplay = document.getElementById('status');
// const randomNumberList = document.getElementById('random-numbers');
// const usernameInput = document.getElementById('username');
// const generateButton = document.getElementById('generate');

// // Escuchar el cambio en la opción de conexión
// connectedRadio.addEventListener('change', () => {
//   if (connectedRadio.checked) {
//     // Conectar el WebSocket
//   }
// });

// disconnectedRadio.addEventListener('change', () => {
//   if (disconnectedRadio.checked) {
//     // Desconectar el WebSocket
//   }
// });

// generateButton.addEventListener('click', () => {
//   const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
//   const username = usernameInput.value;

//   // Enviar los números a través de WebSocket
//   chatSocket.send(JSON.stringify({
//     action: 'generate',
//     numbers: numbers,
//     username: username
//   }));

//   // Actualizar la lista de números en la interfaz de usuario del emisor
//   randomNumberList.innerHTML = numbers.map(number => `<li>${number}</li>`).join('');
// });

// // Evento de mensaje recibido
// chatSocket.onmessage = function(e) {
//   const data = JSON.parse(e.data);

//   if (data.numbers) {
//     // Mostrar números y nombre de usuario en la interfaz de usuario del receptor
//     randomNumberList.innerHTML = data.numbers.map(number => `<li>${number}</li>`).join('');
//     statusDisplay.textContent = `Números enviados por ${data.username}`;
//   }
// };
