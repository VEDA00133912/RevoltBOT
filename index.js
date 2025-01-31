const revolt = require('revolt.js');
const revoltHandler = require('revolthandler.js');
const config = require('./config.json');  
require('dotenv').config(); 
const TOKEN = process.env.REVOLT_TOKEN

const client = new revolt.Client();
const handler = new revoltHandler.Handler({
    client: client, 
    prefix: config.prefix, 
    owners: [config.owners], 
    path: './commands',
});

client.once('ready', () => {
    handler.start();
    console.log(`${client.user.username} is online!`);
    client.api.patch('/users/@me', { status: { text: `r^helpでヘルプ表示`, presence: 'Idle' } });
    console.log('Activity setup complete');
});

client.loginBot(TOKEN);
