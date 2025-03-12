import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import handleAutoRespond from './autorespond.js';
import handleMediaChannel from './mediaChannel.js';
import { handleCommands } from './commands.js';
import handleAutoRole from './autorole.js';
import checkAllMembers from './checkAllMembers.js';
import { startGame, messageListener } from './tebakAngka.js';
import addRoleCommand from './addrole.js'; // Import addrole

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', async () => {
    console.log(`✅ Bot ${client.user.tag} sudah online!`);
    await handleAutoRole(client); 

    setInterval(() => {
        checkAllMembers(client);
    }, 24 * 60 * 60 * 1000); 
});

client.on('guildMemberAdd', async (member) => {
    const bayiRoleId = '1349282541546242090'; 

    try {
        await member.roles.add(bayiRoleId);
        console.log(`✅ ${member.user.tag} mendapatkan role Bayi!`);
    } catch (error) {
        console.error(`❌ Gagal memberikan role ke ${member.user.tag}:`, error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    handleAutoRespond(message);
    handleMediaChannel(message);
    messageListener(message);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'tebak-angka') {
        await startGame(interaction);
    } else if (interaction.commandName === 'addrole') {
        await addRoleCommand.execute(interaction);
    }

    handleCommands(interaction);
});

client.login(process.env.TOKEN);
