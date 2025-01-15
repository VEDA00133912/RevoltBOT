const revolt = require('revolt.js');
const revoltHandler = require('revolthandler.js');
const config = require('./config.json');  
const fs = require('fs');
require('dotenv').config(); 
const TOKEN = process.env.REVOLT_TOKEN

const client = new revolt.Client();
const handler = new revoltHandler.Handler({
    client: client, 
    prefix: '^', 
    owners: config.owners, 
    path: './commands',
});

client.once('ready', () => {
    handler.start();
});

client.loginBot(TOKEN);
