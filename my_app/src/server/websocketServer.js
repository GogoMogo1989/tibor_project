const WebSocket = require('ws');

// WebSocket szerver indítása
const server = new WebSocket.Server({ port: 8080 });
// Eseménykezelő a szerver indítására
server.on('listening', () => {
  console.log('WebSocket server fut a 8080 porton');
});

// Csatlakozott kliensek tárolására használt tömb
const clients = new Set();

// Eseménykezelő a kliensek csatlakozására
server.on('connection', (socket) => {
  console.log('Client connected');

  // Kliens hozzáadása a tárolóhoz
  clients.add(socket);

  // Eseménykezelő az üzenetek fogadására a kliensektől
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Az üzenet továbbítása az összes többi kliensnek, beleértve az eredeti küldőt is
    for (const client of clients) {
      // Az üzenet küldése a feliratkozóknak (subscribers), beleértve az eredeti küldőt is
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  // Eseménykezelő a kliens lecsatlakozására
  socket.on('close', () => {
    console.log('Client disconnected');

    // Kliens eltávolítása a tárolóból
    clients.delete(socket);
  });
});