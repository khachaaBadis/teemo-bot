import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";
import {Teemo} from "../teemo/teemo";

export const CommandTeemo: CommandData = {
    data: new SlashCommandBuilder()
        .setName("teemo")
        .setDescription("If you want to break the server go ahead")
        .addNumberOption(option=> option.setName("unknown").setMinValue(1).setMaxValue(10).setDescription("The smaller it is  the better").setRequired(true))
        .toJSON(),
    run: async (client: Client, interaction: CommandInteraction) => {
        const wait = require('node:timers/promises').setTimeout;

        //On récupère les options
        let iterations = interaction.options.getNumber('unknown')??0;

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
        if(iterations == 0) {
            await interaction.followUp({
                ephemeral: true,
                content: "A number is missing!"
            });

            return;
        }

        //on envoit le spam
        for (let i = 0; i < 10 * iterations; i++) {
            await wait(500);
            interaction.channel?.send(Teemo());
        }


    }
}
