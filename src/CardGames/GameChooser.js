module.exports = {
chooseGame:function(game, botRef){
    botRef.bot.sendMessage({
        to: botRef.channelID,
        message: 'blackjack started!'
    });
    return 'blackjack';
    }
}
