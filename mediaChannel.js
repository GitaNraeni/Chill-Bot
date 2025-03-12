export default async (message) => {
    if (!message.guild || message.author.bot) return;

    const mediaChannelId = '1331139919581806600'; // Ganti dengan ID channel khusus media

    if (message.channel.id === mediaChannelId) {
        // Cek apakah ada attachment (gambar/video)
        const hasImageOrVideo = message.attachments.some(attachment => {
            return attachment.contentType && (attachment.contentType.startsWith('image') || attachment.contentType.startsWith('video'));
        });

        if (!hasImageOrVideo) {
            await message.delete();
            await message.channel.send({
                content: `🚫 ${message.author}, hanya boleh mengirim gambar/video di sini!`
            }).then(msg => setTimeout(() => msg.delete(), 5000)); // Hapus peringatan setelah 5 detik
            return;
        }

        // Tambahkan auto-reaction hanya di channel media
        try {
            await message.react('🔥'); // Bisa ganti emoji
        } catch (error) {
            console.error('Gagal menambahkan reaction:', error);
        }

        // Buat thread otomatis
        try {
            const thread = await message.startThread({
                name: `Balasan untuk ${message.author.username}`,
                autoArchiveDuration: 60, // Thread otomatis arsip setelah 1 jam
            });

            await thread.send(`📌 Thread ini untuk membahas media dari ${message.author.username}!`);
        } catch (error) {
            console.error('Gagal membuat thread:', error);
        }
    }
};
