import {Client, Message, MessageMentions} from "discord.js";
import {Teemo, TeemoText} from "../teemo/teemo";

/**
 We create an export method that will allow you to know if a user_discord sends a message *
  @param client
 */
export default (client: Client): void => {

    ////We retrieve the event when a message is created
    client.on("messageCreate", async (message: Message) => {

        if(message.author.bot) return;

        //We retrieve the message
        const content = message.content;

        // @ts-ignore
        if(message.mentions.has(client.user.id)) {
            const shoot = client.emojis.cache.random();
            message.channel.send(`${TeemoText(5, true)} ${shoot}`);
        }

        if (content.includes("teemo")) {
            await message.reply(Teemo())
        }

    })
};