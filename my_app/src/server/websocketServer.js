const WebSocket = require('ws');

// WebSocket szerver indítása
const server = new WebSocket.Server({ port: 8080 });

// Csatlakozott kliensek tárolására használt Map
const clients = new Map();

// Az üzenetek tárolására használt tömb
const messages = [];

// Eseménykezelő a szerver indítására
server.on('listening', () => {
  console.log('WebSocket server fut a 8080 porton');
});

// Eseménykezelő a kliensek csatlakozására
server.on('connection', (socket) => {
  // Eseménykezelő a kliens azonosítójának fogadására
  socket.on('identity', (identity) => {
    console.log('Client identity:', identity);
    console.log('Client email:', identity.email);

    // Kliens hozzáadása a tárolóhoz
    clients.set(identity.email, socket);

    // Kiírjuk az összes e-mail címet a konzolra
    const emails = Array.from(clients.keys());
    console.log('Clients:', emails);
  });

  // Eseménykezelő az üzenetek fogadására a kliensektől
  socket.on('message', (message) => {
    console.log('Received message:', message);
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);

    // Az üzenet továbbítása a címzetnek
    const recipientEmail = parsedMessage.recipientEmail;
    if (clients.has(recipientEmail)) {
      const recipientSocket = clients.get(recipientEmail);
      recipientSocket.send(JSON.stringify(parsedMessage));
      console.log('Forwarded message to recipient:', parsedMessage);
    }

    // Az üzenet továbbítása az eredeti küldőnek is, hogy megkapja saját üzenetét
    socket.send(JSON.stringify(parsedMessage));
    console.log('Sent message to sender:', parsedMessage);

    // Az üzenet hozzáadása az üzenetek tömbhöz
    messages.push(parsedMessage);
    console.log('Saved message:', parsedMessage);

    // Üzenetek tömb logolása
    console.log('Messages:', messages);
  });

  // Eseménykezelő a kliens lecsatlakozására
  socket.on('close', () => {
    console.log('Client disconnected');

    // Az eltávolítandó kliens azonosítójának keresése a tárolóban
    let key = null;
    for (const [email, clientSocket] of clients.entries()) {
      if (clientSocket === socket) {
        key = email;
        break;
      }
    }

    // Kliens eltávolítása a tárolóból
    if (key) {
      clients.delete(key);
    }
  });
});
