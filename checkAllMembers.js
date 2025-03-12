export default async function checkAllMembers(client) {
    const guild = client.guilds.cache.first(); // Ambil server pertama
    if (!guild) return console.log('❌ Bot tidak terhubung ke server!');

    await guild.members.fetch(); // Ambil semua member

    guild.members.cache.forEach(member => {
        const bayiRoleId = '1349282541546242090'; // Ganti dengan ID role "Bayi"

        if (!member.roles.cache.has(bayiRoleId)) {
            member.roles.add(bayiRoleId)
                .then(() => console.log(`✅ ${member.user.tag} mendapatkan role baru!`))
                .catch(err => console.error(`❌ Gagal memberikan role ke ${member.user.tag}:`, err));
        }
    });
}
