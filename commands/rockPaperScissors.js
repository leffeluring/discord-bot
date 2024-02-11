// You might need to adjust this based on your play functionality
module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors!',
    execute(message, args) {
        const choices = ['rock', 'paper', 'scissors'];
        if (args.length === 0) {
            return message.reply("Please provide your choice: rock, paper, or scissors. Example: '!rps rock'");
        }
        const userChoice = args[0].toLowerCase();
        if (!choices.includes(userChoice)) {
            return message.reply("Please choose rock, paper, or scissors.");
        }
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(userChoice, botChoice);
        message.reply(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);
        console.log('rockPaperScissors command was triggered');
    },
};

function determineWinner(user,bot) {
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