var Discord = require('discord.io');
var auth = require('./auth.json');
var BotData = require('./BotData.js')
//Card game directory
var cardDir = "./CardGames"
var CardGames = require(cardDir)

//Card game objects
var Blackjack = require(cardDir + '/Blackjack.js')
var GoFish = require(cardDir + '/GoFish.js')

//Game info
var gameCards = [['blackjack', Blackjack], ['gofish', GoFish]]
var gameTypes = [[gameCards, CardGames]]

//Active channels
var channels = []

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
                    if (cmd == g[0]){
                        //Command is a game, initialise this game
                        gameChosen = gt[1].chooseGame(g, botRef);
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
            if (cmd == 'stop'){
                bot.sendMessage({
                    to: channelID,
                    message: ('Stopping game...')
                });
                channels.splice(flag,1);
            }
            else{
                //var success = channels[x][1].send();
                var success = false;
                if (!success){
                    bot.sendMessage({
                        to: channelID,
                        message: ("Game already started")
                    });
                }
            }
        }
    }
});
