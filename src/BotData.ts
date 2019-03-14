import { Client, TextChannel, DMChannel, GroupDMChannel } from "discord.js";

export interface BotData {
    bot: Client;
    user: string;
    userID: string;
    channelID: TextChannel | DMChannel | GroupDMChannel;
    message: string;
    evt?: any;
}