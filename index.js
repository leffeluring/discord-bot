require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Command handling structure
const commands = {
    ping: {
        execute: (message) => message.channel.send('Pong!'),
        description: 'Responds with Pong!'
    },
    help: {
        execute: (message) => message.channel.send('Helpful information'),
        description: 'Provides helpful information.'
    },
    rps: {
        execute: (message, args) => {
            const choices = ['rock', 'paper', 'scissors'];
            if (args.length === 0) {
                return message.channel.send("Please provide your choice: rock, paper, or scissors. Example: '!rps rock'");
            }
            const userChoice = args[0].toLowerCase();
            if (!choices.includes(userChoice)) {
                return message.channel.send("Please choose rock, paper, or scissors.");
            }
            const botChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = determineWinner(userChoice, botChoice);
            message.channel.send(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);
        },
        description: 'Play Rock Paper Scissors.'
    }
};

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'commands') {
        const commandsList = Object.keys(commands).map(cmd => `!${cmd} - ${commands[cmd].description}`).join('\n');
        message.channel.send(`Available commands:\n${commandsList}`);
    } else if (commands[command]) {
        commands[command].execute(message, args);
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