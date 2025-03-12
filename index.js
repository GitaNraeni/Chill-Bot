import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import handleAutoRespond from './autorespond.js';
import handleMediaChannel from './mediaChannel.js';
import { handleCommands } from './commands.js';
import handleAutoRole from './autorole.js';
import checkAllMembers from './checkAllMembers.js';
import { startGame, messageListener } from './tebakAngka.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers // Tambah biar bisa cek member
    ]
});

client.once('ready', async () => {
    console.log(`✅ Bot ${client.user.tag} sudah online!`);
    await handleAutoRole(client); // Jalankan auto-role

    // Set interval untuk update role setiap 24 jam
    setInterval(() => {
        checkAllMembers(client);
    }, 24 * 60 * 60 * 1000); // 24 jam
});

// Event untuk auto-role saat member baru join
client.on('guildMemberAdd', async (member) => {
    const bayiRoleId = '1349282541546242090'; // Role Bayi (baru join)

    try {
        await member.roles.add(bayiRoleId);
        console.log(`✅ ${member.user.tag} mendapatkan role Bayi!`);
    } catch (error) {
        console.error(`❌ Gagal memberikan role ke ${member.user.tag}:`, error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    handleAutoRespond(message); // Auto respon
    handleMediaChannel(message); // Cek media di channel khusus
    messageListener(message); // Cek tebakan angka
});

client.on('interactionCreate', async (interaction) => {
    handleCommands(interaction);

    if (interaction.commandName === 'tebak-angka') {
        await startGame(interaction);
    }
});

client.login(process.env.TOKEN);
