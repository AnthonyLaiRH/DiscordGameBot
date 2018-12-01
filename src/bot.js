var Discord = require('discord.io');
var auth = require('./auth.json');
var CardGames = require('./CardGames')
var BotData = require('./BotData.js')
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var channels = []
var gameCards = ['blackjack']
var gameTypes = [[gameCards, CardGames]]

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
        var flag = -1;
        for (var x = 0; x<channels.length; x++){
            if (channels[x][0] == channelID){
                flag = x;
                break;
            }
        }
        //Channel has no ongoing game
        if (flag == -1){
            var gameChosen;
            var breaker = false;
            //Loop through all game categories
            for (var x = 0; x < gameTypes.length; x++){
                //Loop through all game names
                var gt = gameTypes[x];
                for (var y = 0; y < gt[0].length; y++){
                    var g = gt[0][y];
                    if (cmd == g){
                        //Command is a games, initialise this game
                        gameChosen = gt[1].chooseGame(cmd, botRef);
                        channels.push([channelID, gameChosen]);
                        breaker = true;
                        break;
                    }
                }
                if (breaker == true){
                    break;
                }
            }
            if (breaker == false){
                bot.sendMessage({
                    to: channelID,
                    message: ("No game called " + cmd)
                });
            }
        }
        else{
            //channels[x][1].send();

            bot.sendMessage({
                to: channelID,
                message: ("Game " + channels[flag][1] + " already started")
            });
        }
    }
});
