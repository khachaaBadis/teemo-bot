import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";

export const CommandMinMax: CommandData = {
    data: new SlashCommandBuilder()
        .setName("minmax")
        .setDescription("Generates a number between min and max  ")
        .addNumberOption(option=> option.setName("min").setMinValue(0).setDescription("La valeur minimum").setRequired(true))
        .addNumberOption(option=> option.setName("max").setMinValue(1).setDescription("La valeur maximum").setRequired(true))
        .toJSON(),
    run: async (_client: Client, interaction: CommandInteraction) => {
        //On récupère les options
        let min = interaction.options.getNumber('min')??0;
        let max = interaction.options.getNumber('max')??0;

        await interaction.deferReply();

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
        if(min == 0 && max == 0) {
            await interaction.followUp({
                ephemeral: true,
                content: "Numbers are missing!"
            });

            return;
        }

        //On remet le min et max dans le bon sens
        let t = max;
        if(min > max) {
            max = min;
            min = t;
        }

        //On récupère notre chiffre aléatoire
        let value = Math.round(Math.random() * (max - min)) + min;

        let message = `[${min} - ${max}] aaaand that's your number : ${value}`;

        if(value == min) {
            message = "this is the smallest number my dear " + value + " (Min)";
        }

        if(value == max) {
            message = value + " this is the biggest number my dear! (Max)"
        }

        //On répond uniquement a celui qui execute la commande
        await interaction.followUp({
            ephemeral: true,
            content: message
        });
    }
}
