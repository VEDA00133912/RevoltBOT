const revolt = require('revolt.js');
const revoltHandler = require('revolthandler.js');
const config = require('./config.json');  
require('dotenv').config(); 
const TOKEN = process.env.REVOLT_TOKEN

const client = new revolt.Client();
const handler = new revoltHandler.Handler({
    client: client, 
    prefix: config.prefix, 
    owners: config.owners, 
    path: './commands',
});

client.once('ready', () => {
    handler.start();
    console.log(`Logged in as ${client.user.username}!`);
});

client.loginBot(TOKEN);
