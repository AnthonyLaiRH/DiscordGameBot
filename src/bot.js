var Discord = require('discord.io');
var auth = require('./auth.json');
var CardGames = require('./CardGames')
var BotData = require('./BotData.js')
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {

});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var botRef = new BotData(bot, user, userID, channelID, message, evt);
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            case 'blackjack':
                CardGames.chooseGame("blackjack", botRef)
            break;
            // Just add any case commands if you want to..
         }

     }
});