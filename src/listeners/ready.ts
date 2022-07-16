import { Client } from "discord.js";
const { REST } = require('@discordjs/rest');
import {Routes} from "discord-api-types/v10";
import {CommandMinMax} from "../commands/command_min_max";
import {CommandTeemo} from "../commands/command_Teemo";
import {CommandTranslate} from "../commands/command_translate";

/**
 * On crée une méthode d'exportation qui va permettre de savoir si le client est bien lancé
 * @param client
 * @param token
 */
export default (client: Client, token?: string): void => {
    const rest = new REST({ version: '9' }).setToken(token)
    //On enregistre un event
    client.on("ready", async () => {

        //On vérifie que le bot est bien lancé
        if (!client.user || !client.application) {
            console.log('Can not start the bot');
            return;
        }

        //saving of commands
        await rest.put(
            Routes.applicationCommands(client.application.id),
            { body: getCommandsData() },
        );

        
        console.log(`${client.user.username} is online`);
    });
};

export const Commands : any[] = [CommandTeemo, CommandMinMax, CommandTranslate];

/**
 * We retrieve the commands in JSON in a table
 */
const getCommandsData = (): any[] => {
    return Commands.map(c => c.data);
}

/**
 * Allows you to find an order by name
 * @param name - the name of the command to search for
 */
export const findCommand = (name: string): any => {
    return Commands.find(c => c.data.name == name);
}