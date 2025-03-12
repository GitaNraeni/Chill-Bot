export default async function checkAllMembers(client) {
    const guild = client.guilds.cache.get('1331139919581806593');
    if (!guild) return console.error('Gagal menemukan server!');

    const roleTiers = [
        { months: 0, roleId: '1349282541546242090' },
        { months: 3, roleId: '1349282860212682803' },
        { months: 9, roleId: '1349283166719971328' },
        { months: 18, roleId: '1349283355237290045' },
        { months: 36, roleId: '1349283533520240685' }
    ];

    await guild.members.fetch();
    guild.members.cache.forEach(async (member) => {
        if (member.user.bot) return;

        const joinedAt = member.joinedAt;
        const monthsJoined = Math.floor((Date.now() - joinedAt) / (30 * 24 * 60 * 60 * 1000));

        let newRole = null;
        for (const tier of roleTiers) {
            if (monthsJoined >= tier.months) {
                newRole = tier.roleId;
            }
        }

        if (newRole) {
            try {
                const rolesToRemove = roleTiers.map(tier => tier.roleId).filter(id => id !== newRole);
                await member.roles.remove(rolesToRemove);
                await member.roles.add(newRole);
                console.log(`✅ ${member.user.tag} mendapatkan role baru!`);
            } catch (error) {
                console.error(`❌ Gagal memberikan role ke ${member.user.tag}:`, error);
            }
        }
    });
}
