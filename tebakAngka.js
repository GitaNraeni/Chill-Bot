import { EmbedBuilder } from "discord.js";

const gameData = {}; // Menyimpan status game per channel

export async function startGame(interaction) {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    gameData[interaction.channelId] = {
        number: targetNumber,
        active: true,
    };

    const embed = new EmbedBuilder()
        .setColor("#2ecc71")
        .setTitle("🎯 Tebak Angka Dimulai!")
        .setDescription(
            "Bot telah memilih angka antara **1-100**. Tebak angka dengan mengetik langsung di chat!"
        )
        .addFields(
            { name: "📌 Aturan:", value: "• Tebak sebanyak yang kamu mau!\n• Admin bisa memberi **clue** dengan reaction 🔼 atau 🔽.\n• **Waktu:** 1 menit sebelum game berakhir otomatis!" }
        )
        .setFooter({ text: "🎲 Ayo mulai menebak!" });

    await interaction.reply({ embeds: [embed] });

    // Timer 1 menit sebelum game berakhir otomatis
    setTimeout(() => {
        if (gameData[interaction.channelId] && gameData[interaction.channelId].active) {
            interaction.channel.send("⏳ Waktu habis! Tidak ada yang berhasil menebak angka.");
            delete gameData[interaction.channelId];
        }
    }, 60000);
}

export async function messageListener(message) {
    if (!gameData[message.channelId] || !gameData[message.channelId].active) return;
    if (message.author.bot) return;

    const guessedNumber = parseInt(message.content, 10);
    if (isNaN(guessedNumber)) return;

    const targetNumber = gameData[message.channelId].number;

    if (guessedNumber === targetNumber) {
        await message.react("🎉");
        message.channel.send(`🎉 **${message.author.username}** berhasil menebak angka **${targetNumber}**!`);
        delete gameData[message.channelId];
    } else if (guessedNumber > targetNumber) {
        await message.react("🔽");
        message.reply("📉 **Angka lebih kecil!**");
    } else {
        await message.react("🔼");
        message.reply("📈 **Angka lebih besar!**");
    }
}
