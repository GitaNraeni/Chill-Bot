import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Menambahkan role ke user tertentu')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang akan diberikan role')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role yang akan diberikan')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles), 

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: 'User tidak ditemukan!', ephemeral: true });
        }

        if (interaction.guild.ownerId === user.id) {
            return interaction.reply({ content: 'Tidak bisa memberikan role ke owner server!', ephemeral: true });
        }

        await member.roles.add(role);
        await interaction.reply({ content: `✅ Berhasil menambahkan role ${role} ke ${user}`, ephemeral: false });
    }
};
