import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";

export const CommandTranslate: CommandData = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translation from human language to teemo language")
        .addStringOption(option=> option.setName("message").setDescription("The smaller the better").setRequired(true))
        .toJSON(),
    run: async (_client: Client, interaction: CommandInteraction) => {
        //On récupère les options
        let message = interaction.options.getString('message')??null;

        await interaction.deferReply();

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
        if(message == null) {
            await interaction.followUp({
                ephemeral: true,
                content: "Please enter a text to be translated!"
            });

            return;
        }

        let words: string[] = message.split(" ");
        let translated = "";

        for (let i = 0; i < words.length; i++) {

            let word = words[i];
            let length = word.length;

            if(length <= 4) {
                translated += "teemo"
            } else {
                let w = Math.random() <= 0.5 ? "T" : "t";
                let count = length - 1;
                let t = 0;

                while(t < 5) {
                    let n = Math.random() * count / (5 - t);
                    for (let j = 0; j < n; j++) {
                        switch (t) {
                            case 0:
                                w += "t";
                                break;
                            case 1:
                                w += "e";
                                break;
                            case 2:
                                w += "e"
                                break;
                            case 3:
                                w += "m"
                                break;
                            case 4:
                                 w += "o"
                                break;
                        }
                    }
                    count -= n;
                    t++;
                }

                translated += w;
            }

            //On ajoute un espace
            if(i + 1 < words.length) {
                translated += " ";
            }

        }

        //On repond a celui qui a fait la commande
        await interaction.followUp({
            content: "Message : " + message
        })
        await interaction.followUp({
            content: "Traduction : " + translated
        })
    }
}
