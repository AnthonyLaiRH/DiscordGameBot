module.exports = {
chooseGame:function(gameChosen, botRef){
    console.log(gameChosen);
    var temp = new gameChosen[1](botRef);
    botRef.bot.sendMessage({
        to: botRef.channelID,
        message: gameChosen[0] + ' started!' + " Enter !ready to ready up, !join to join a game, !leave to leave a game",
    });
    return temp;
    }
}
