import { ActivityType, PermissionsBitField } from 'discord.js';

export async function handleCommands(interaction) {                                                                                                                
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (interaction.commandName === 'say') {
        const text = interaction.options.getString('text');
        await interaction.channel.send(text);
        await interaction.reply({ content: 'Pesan berhasil dikirim!', ephemeral: true });
    } else if (interaction.commandName === 'setstatus') {
        const type = interaction.options.getString('type');
        const text = interaction.options.getString('text');

        let statusType;
        switch (type) {
            case 'playing': statusType = ActivityType.Playing; break;
            case 'streaming': statusType = ActivityType.Streaming; break;
            case 'listening': statusType = ActivityType.Listening; break;
            case 'watching': statusType = ActivityType.Watching; break;
            case 'competing': statusType = ActivityType.Competing; break;
            default: return await interaction.reply({ content: 'Tipe status tidak valid!', ephemeral: true });
        }

        interaction.client.user.setActivity(text, { type: statusType });

        await interaction.reply({ content: `✅ Status bot diubah menjadi **${type.toUpperCase()}**: ${text}`, ephemeral: true });
    } else if (interaction.commandName === 'kick') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: '❌ Kamu tidak memiliki izin untuk kick member!', ephemeral: true });
        }

        const member = interaction.options.getMember('user');
        if (!member) return await interaction.reply({ content: '❌ User tidak ditemukan!', ephemeral: true });

        await member.kick();
        await interaction.reply({ content: `✅ ${member.user.tag} telah di-kick dari server!` });
    } else if (interaction.commandName === 'ban') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: '❌ Kamu tidak memiliki izin untuk ban member!', ephemeral: true });
        }

        const member = interaction.options.getMember('user');
        if (!member) return await interaction.reply({ content: '❌ User tidak ditemukan!', ephemeral: true });

        await member.ban();
        await interaction.reply({ content: `✅ ${member.user.tag} telah di-ban dari server!` });
    } else if (interaction.commandName === 'unban') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: '❌ Kamu tidak memiliki izin untuk unban member!', ephemeral: true });
        }

        const userId = interaction.options.getString('userid');
        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply({ content: `✅ User dengan ID ${userId} telah di-unban!` });
        } catch (error) {
            await interaction.reply({ content: '❌ Gagal unban user! Pastikan ID benar.', ephemeral: true });
        }
    } else if (interaction.commandName === 'mute') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return await interaction.reply({ content: '❌ Kamu tidak memiliki izin untuk mute member!', ephemeral: true });
        }

        const member = interaction.options.getMember('user');
        if (!member) return await interaction.reply({ content: '❌ User tidak ditemukan!', ephemeral: true });

        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return await interaction.reply({ content: '❌ Role "Muted" tidak ditemukan!', ephemeral: true });

        await member.roles.add(muteRole);
        await interaction.reply({ content: `✅ ${member.user.tag} telah di-mute!` });
    } else if (interaction.commandName === 'unmute') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return await interaction.reply({ content: '❌ Kamu tidak memiliki izin untuk unmute member!', ephemeral: true });
        }

        const member = interaction.options.getMember('user');
        if (!member) return await interaction.reply({ content: '❌ User tidak ditemukan!', ephemeral: true });

        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return await interaction.reply({ content: '❌ Role "Muted" tidak ditemukan!', ephemeral: true });

        await member.roles.remove(muteRole);
        await interaction.reply({ content: `✅ ${member.user.tag} telah di-unmute!` });
    }
}
