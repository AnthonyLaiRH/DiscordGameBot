module.exports = class BotData{
    constructor(bot, user, userID, channelID, message, evt = null){
        this.bot = bot;
        this.user = user;
        this.userID = userID;
        this.channelID = channelID;
        this.message = message;
        this.evt = evt;
    }
}