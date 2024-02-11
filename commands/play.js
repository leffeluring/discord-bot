// You might need to adjust this based on your play functionality
module.exports = {
    name: 'play',
    description: 'Plays a song from YouTube.',
    execute(interaction) {
        interaction.reply('ping from play.js!');
        interaction.reply('Lets play some music');
    },
};