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

  socket.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    clientEmail = parsedMessage.email;
    clients.set(clientEmail, socket);
    console.log('Csatlakozott felhasználók email-ei:', Array.from(clients.keys()));

    if (!parsedMessage.recipientEmail) {
        parsedMessage.recipientEmail = parsedMessage.yourAdminEmail;
      }
      
      const recipientEmail = parsedMessage.recipientEmail;
      
      if (clients.has(recipientEmail)) {
        const recipientSocket = clients.get(recipientEmail);
        recipientSocket.send(JSON.stringify(parsedMessage));
        console.log('Üzenet elküldve:', parsedMessage);
      } else {
        console.log('Nem található felhasználó email:', recipientEmail);
      }
      

    socket.send(JSON.stringify(parsedMessage));
  });

  // Eseménykezelő a kliens lecsatlakozására
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
