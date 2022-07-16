import {BaseCommandInteraction, Client, CommandInteraction} from "discord.js";

/**
 * Notre interface qui va servir a gérer les commandes par la data (enregistré sur discord)
 * et notre run qui va être éxécuté dans l'interaction
 */
export interface CommandData {
    /**
     * Data de la commande enregistré sur le client
     */
    data: any,

    /**
     * Notre executable qui va être appelé lors d'une interaction
     * @param client
     * @param interaction
     */
    run: (_client: Client, interaction: CommandInteraction , interaction2: BaseCommandInteraction) => void;
}