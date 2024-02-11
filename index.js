require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


client.once('ready', () => {
    console.log('Ready!');
});


client.on('messageCreate', message => {

    if (message.content === '!ping') {

        message.channel.send('Pong!');
    }
});


client.login(process.env.DISCORD_BOT_TOKEN);


client.on('error', console.error);
client.on('shardError', console.error);
client.on('disconnect', () => console.log('Bot is disconnecting...'));
client.on('reconnecting', () => console.log('Bot reconnecting...'));

