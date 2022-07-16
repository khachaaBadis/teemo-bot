import {Client, Intents} from "discord.js";
import ready from "./listeners/ready";
import interaction from "./listeners/interaction";
import message from "./listeners/message";
//Chargement du fichier environnement
require('dotenv').config();

console.log("THE TEEMO Bot is starting...");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

//Ajout d'un evement pour signaler a l'utilisateur que le client a bien démarré
client.once('ready', () => {
    console.log("THE TEEMO bot has been started.")
});

const token = process.env.APP_TOKEN;

//On enregistre nos listeners
ready(client, token);
interaction(client);
message(client);

//On démarre le client
client.login(token);