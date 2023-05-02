const WebSocket = require('ws');

// WebSocket szerver indítása
const server = new WebSocket.Server({ port: 8080 });

// Csatlakozott kliensek tárolására használt Map
const clients = new Map();

// Eseménykezelő a szerver indítására
server.on('listening', () => {
  console.log('WebSocket server fut a 8080 porton');
});

// Eseménykezelő a kliensek csatlakozására
server.on('connection', (socket) => {
  let clientEmail = null; // Változó a kliens e-mail címének tárolására

  // Eseménykezelő a kliens azonosítójának fogadására
  socket.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
  
    clientEmail = parsedMessage.email;

      // Kliens hozzáadása a tárolóhoz
      clients.set(clientEmail, socket);

      // Kiírjuk az összes e-mail címet a konzolra
      console.log('Csatlakozott felhasználók email-ei:', Array.from(clients.keys()));

    // Az üzenet továbbítása a címzetthez
    const recipientEmail = parsedMessage.recipientEmail;
    if (clients.has(recipientEmail)) {
      const recipientSocket = clients.get(recipientEmail);
      recipientSocket.send(JSON.stringify(parsedMessage));
      console.log('Üzenet elküldve:', parsedMessage);
    } else {
      console.log('Címzett email nem található:', recipientEmail);
    }

    socket.send(JSON.stringify(parsedMessage));
    
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
