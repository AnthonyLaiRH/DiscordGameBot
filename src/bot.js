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
        var cmd = args[0].toLowerCase();

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
                        var newPlayer = gameChosen.createPlayer(botRef);
                        gameChosen.table.push[newPlayer];
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
                var currGame = channels[flag][1];
                if (!currGame.gameStarted){
                    switch (cmd){
                        case 'join':
                            var inHere = false;
                            for(var i = 0; i < currGame.table.length; i++){
                                if (currGame.table[i].userID == userID) {
                                    inHere = true;
                                    bot.sendMessage({
                                        to: channelID,
                                        message: "Already in the room",
                                    });
                                    break;
                                }
                            }
                            if (!inHere){
                                if (currGame.table.length  < currGame.maxPlayers){
                                    var newPlayer = currGame.createPlayer(botRef);
                                    currGame.table.push[newPlayer];
                                    bot.sendMessage({
                                        to: channelID,
                                        message: "Welcome to Blackjack! Room" + channelID,
                                    });
                                }else{
                                    bot.sendMessage({
                                        to: channelID,
                                        message: "Sorry. Table Currently Full.",
                                    });
                                }
                            }
                        break;
                        case 'leave':
                            for( var i = 0; i < currGame.table.length; i++){
                                if (currGame.table[i].userID == userID) {
                                    if (currGame.table.length == 1){
                                        bot.sendMessage({
                                            to: channelID,
                                            message: ('Stopping game...')
                                        });
                                        channels.splice(flag,1);
                                    }
                                    currGame.table.splice(i, 1);
                                    var pos = currGame.readyPlayers.indexOf(userID);
                                    if (pos != -1){
                                        currGame.readyPlayers.splice(pos,1);
                                    }
                                    bot.sendMessage({
                                        to: channelID,
                                        message: "Goodbye.",
                                    });
                                    break;
                                }
                            }
                        break;
                        case 'ready':
                            for( var i = 0; i < currGame.table.length; i++){
                                if (currGame.table[i].userID == userID) {
                                    currGame.table.splice(i, 1);
                                    var pos = currGame.readyPlayers.indexOf(userID);
                                    if (pos == -1){
                                        currGame.readyPlayers.push(userID);
                                    }
                                    else{
                                        currGame.readyPlayers.splice(pos,1);
                                    }
                                    bot.sendMessage({
                                        to: channelID,
                                        message:((currGame.table.length-currGame.readyPlayers.length).toString() + " players must be ready to start.")
                                    });
                                    break;
                                }
                                if (currGame.table.length==currGame.readyPlayers.length){
                                    bot.sendMessage({
                                        to: channelID,
                                        message: ("Starting game with " + currGame.readyPlayers.length.toString() + " players.")
                                    });
                                    currGame.start();
                                }
                            }
                        break;
                    }
                }
                else{
                    currGame.receive(botRef);
                }
            }
        }
    }
});
