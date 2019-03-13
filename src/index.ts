import { Client } from 'discord.js';
let auth = require('./auth.json');
const logger = require('winston');
import { BotData } from './BotData.js';
//Card game directory
var cardDir = "./CardGames";
var CardGames = require(cardDir);

//Card game objects
var Blackjack = require(cardDir + '/Blackjack.js');
var GoFish = require(cardDir + '/GoFish.js');

//Game info
var gameCards = [
    ['blackjack', Blackjack],
    ['gofish', GoFish]
];
var gameTypes = [
    [gameCards, CardGames]
];

//Active channels
var channels = [];
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Client();

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag + ' - (' + bot.user.id + ')');
});

bot.on('message', async message => {
    try {
        //ignore other bots. This also makes your bot ignore itself
        // and not get into a spam loop
        if (message.author.bot) return;

        // ignore any message that does not start with our prefix, 
        if (message.content.indexOf('!') !== 0) return;

        // Our bot needs to know if it will execute a command
        // It will listen for messages that will start with `!`
        if (message.content.substring(0, 1) == '!') {
            var cmd = message.content.slice(1).trim().toLowerCase();
            var user = message.member.user.tag;
            var userID = message.member.user.id;
            var channelID = message.channel;

            var botRef = {
                bot: bot,
                user: user,
                userID: userID,
                channelID: channelID,
                message: cmd
            };

            var flag = -1;
            for (var x = 0; x < channels.length; x++) {
                if (channels[x][0] == channelID) {
                    flag = x;
                    break;
                }
            }
            //Channel has no ongoing game
            if (flag == -1) {
                var gameChosen;
                var breaker = false;
                //Loop through all game categories
                for (var x = 0; x < gameTypes.length; x++) {
                    //Loop through all game names
                    var gt = gameTypes[x];
                    for (var y = 0; y < gt[0].length; y++) {
                        var g = gt[0][y];
                        if (cmd == g[0]) {
                            //Command is a game, initialise this game
                            console.log(gameCards[1][1]);
                            gameChosen = gt[1].chooseGame(g, botRef);
                            console.log("created")
                            channels.push([channelID, gameChosen]);
                            breaker = true;
                            break;
                        }
                    }
                    if (breaker == true) {
                        break;
                    }
                }
                if (breaker == false) {
                    channelID.send("No game called " + cmd);
                }
            } else {
                if (cmd == 'stop') {
                    await bot.sendMessage({
                        to: channelID,
                        message: ('Stopping game...')
                    });
                    channels.splice(flag, 1);
                } else {
                    var currGame = channels[flag][1];
                    if (!currGame.gameStarted) {
                        switch (cmd) {
                            case 'join':
                                var inHere = false;
                                for (var i = 0; i < currGame.table.length; i++) {
                                    if (currGame.table[i].userID == userID) {
                                        inHere = true;
                                        await bot.sendMessage({
                                            to: channelID,
                                            message: "Already in the room",
                                        });
                                        break;
                                    }
                                }
                                if (!inHere) {
                                    if (currGame.table.length < currGame.maxPlayers) {
                                        currGame.createPlayer();
                                        await bot.sendMessage({
                                            to: channelID,
                                            message: "Welcome to Blackjack! Room" + channelID,
                                        });
                                    } else {
                                        await bot.sendMessage({
                                            to: channelID,
                                            message: "Sorry. Table Currently Full.",
                                        });
                                    }
                                }
                                break;
                            case 'leave':
                                for (var i = 0; i < currGame.table.length; i++) {
                                    if (currGame.table[i].userID == userID) {
                                        if (currGame.table.length == 1) {
                                            await bot.sendMessage({
                                                to: channelID,
                                                message: ('Stopping game...')
                                            });
                                            channels.splice(flag, 1);
                                        }
                                        currGame.table.splice(i, 1);
                                        var pos = currGame.readyPlayers.indexOf(userID);
                                        if (pos != -1) {
                                            currGame.readyPlayers.splice(pos, 1);
                                        }
                                        await bot.sendMessage({
                                            to: channelID,
                                            message: "Goodbye.",
                                        });
                                        break;
                                    }
                                }
                                break;
                            case 'ready':
                                for (var i = 0; i < currGame.table.length; i++) {
                                    console.log(currGame.table[i])
                                    if (currGame.table[i].userID == userID) {
                                        var pos = currGame.readyPlayers.indexOf(userID);
                                        if (pos == -1) {
                                            currGame.readyPlayers.push(userID);
                                        } else {
                                            currGame.readyPlayers.splice(pos, 1);
                                        }
                                        console.log(currGame.readyPlayers);
                                        channelID.send(currGame.table.length - currGame.readyPlayers.length == 0 ? "All players are ready!" : ((currGame.table.length - currGame.readyPlayers.length).toString() + " players must be ready to start."));
                                    }
                                    if (currGame.table.length == currGame.readyPlayers.length) {
                                        channelID.send("Starting game with " + currGame.readyPlayers.length.toString() + " players.");
                                        console.log("hello");
                                        currGame.start();
                                        break;
                                    }
                                }
                                break;
                        }
                    } else {
                        currGame.botRef.message = cmd;
                        currGame.receive();
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
});
bot.login(auth.token);