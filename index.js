require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {

    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
    if (message.content === '!help') {
        message.channel.send('Käften pleb');
    }
    


    if (message.content.startsWith('!rps')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.channel.send("Please provide your choice: rock, paper, or scissors as the following example '!rps rock'");
        }
        const userChoice = args[1].toLowerCase();
        const choices = ['rock', 'paper', 'scissors'];
        if (!choices.includes(userChoice)) {
            return message.channel.send("Please choose rock, paper, or scissors.");
        }
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(userChoice, botChoice);
        message.channel.send(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);
    }
});


function determineWinner(user, bot) {
    if (user === bot) {
        return "It's a tie!";
    }
    if ((user === 'rock' && bot === 'scissors') ||
        (user === 'scissors' && bot === 'paper') ||
        (user === 'paper' && bot === 'rock')) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

client.login(process.env.DISCORD_BOT_TOKEN);


client.on('error', console.error);
client.on('shardError', console.error);
client.on('disconnect', () => console.log('Bot is disconnecting...'));
client.on('reconnecting', () => console.log('Bot reconnecting...'));