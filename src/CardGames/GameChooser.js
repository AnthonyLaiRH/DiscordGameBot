module.exports = {
chooseGame:function(gameChosen, botRef){
    var temp = new gameChosen[1](botRef)
    botRef.bot.sendMessage({
        to: botRef.channelID,
        message: gameChosen[0] + ' started!'
    });
    return temp;
    }
}
