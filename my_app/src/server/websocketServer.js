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
    const parsedMessage = JSON.parse(message); //ParsedMessage-ban a message (CHatMessage) értékét mentjük
  
    clientEmail = parsedMessage.email; //Kivesszük az email címet
    clients.set(clientEmail, socket); // Kliens hozzáadása a tárolóhoz
    console.log('Csatlakozott felhasználók email-ei:', Array.from(clients.keys())); // Kiírjuk az összes e-mail címet a konzolra

    // Az üzenet továbbítása a címzetthez
    const recipientEmail = parsedMessage.recipientEmail; //Címzett email címének mentése
    if (clients.has(recipientEmail)) { //Ha a clients map-ben szerepel az recipientEmail értéke akkor:
      const recipientSocket = clients.get(recipientEmail)
      recipientSocket.send(JSON.stringify(parsedMessage)); //JSON-ban elküldük az kivett email című címzettnek az üzenetet
      console.log('Üzenet elküldve:', parsedMessage); 
    } else {
      console.log('Címzett email nem található:', recipientEmail);
    }

    //JSON-ban elküldjük az üzenet küldőjének is az üzenetet.
    socket.send(JSON.stringify(parsedMessage)); 

  });

  // Eseménykezelő a kliens lecsatlakozására
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
