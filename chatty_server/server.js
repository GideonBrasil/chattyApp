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
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    // username color logic
    counter++
    ws.uniqueColor = colorArray[counter % 50]

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