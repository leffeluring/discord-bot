module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute(interaction) {
        interaction.reply('Pong from ping.js!');
        console.log('Ping command was triggered');
    },
};