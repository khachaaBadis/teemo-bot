import {BaseCommandInteraction, Client, Message} from "discord.js";
import {findCommand} from "./ready";
import {Teemo} from "../teemo/teemo";

/**
 * On crée une méthode d'exportation qui va permettre de savoir si un user_discord fait une interaction , comme une commande par exemple
 * @param client
 */
export default (client: Client): void => {
    //On récupère l'event d'interaction
    client.on("interactionCreate", async (interaction: any) => {
        //On regarde si l'interaction est une commande
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    //On parcours notre liste de commande et on cherche un nom similaire
    const slashCommand = findCommand(interaction.commandName);
    if (!slashCommand) {
        await interaction.reply({ content: "An error has occurred", ephemeral: true });
        return;
    }

    slashCommand.run(client, interaction);
};