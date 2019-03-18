// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const WebSockets = require('ws')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});

// set up username color array
let counter = 0;
var colorArray = ['#333333', '#4a2e2e', '#5f1515', '#0d0202', '#1d4b59',
    '#244852', '#2b2073', '#0a2d24', '#3e4210', '#4c1b3f'
];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    // username color logic
    counter++
    ws.uniqueColor = colorArray[counter % 10]

    // count connected users and send value to clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSockets.OPEN) {
            client.send(JSON.stringify(wss.clients.size))
        }
    });
    console.log('Client connected');

    //receive data
    ws.on('message', (message) => {
        let newMessage = JSON.parse(message);
        newMessage.id = uuid();
        //check messages received and decide what to do with it
        switch (newMessage.type) {
            case "postNotification":
                newMessage.type = "incomingNotification";
                break;
            case 'postMessage':
                newMessage.type = "incomingMessage";
                newMessage.color = ws.uniqueColor
                break;
            default:
                throw new Error("Unknown event type " + newMessage.type);
        }
        wss.clients.forEach(client => {
            if (client.readyState === WebSockets.OPEN) {
                client.send(JSON.stringify(newMessage))
            }
        });
    });
    console.log(wss.clients.size);

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        //count connected users when client closes app and send value to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSockets.OPEN) {
                client.send(JSON.stringify(wss.clients.size))
            }
        });

    });


});