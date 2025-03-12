import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Cek koneksi bot',
    },
    {
        name: 'say',
        description: 'Bot mengulang teks yang kamu masukkan',
        options: [
            {
                name: 'text',
                type: 3,
                description: 'Teks yang ingin dikirim bot',
                required: true,
            }
        ]
    },
    {
        name: 'setstatus',
        description: 'Mengubah status bot',
        options: [
            {
                name: 'type',
                type: 3,
                description: 'Tipe status bot',
                required: true,
                choices: [
                    { name: 'Playing', value: 'playing' },
                    { name: 'Streaming', value: 'streaming' },
                    { name: 'Listening', value: 'listening' },
                    { name: 'Watching', value: 'watching' },
                    { name: 'Competing', value: 'competing' },
                ]
            },
            {
                name: 'text',
                type: 3,
                description: 'Teks status bot',
                required: true,
            }
        ]
    },
    {
        name: 'tebak-angka', // 🔥 Command baru ditambahkan di sini
        description: 'Main tebak angka antara 1-100!',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('🔄 Mendaftarkan global slash commands...');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('✅ Global slash commands berhasil didaftarkan!');
    } catch (error) {
        console.error(error);
    }
})();
