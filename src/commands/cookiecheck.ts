import { SlashCommandBuilder, CommandInteraction, TextChannel, ActionRow, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder, ChatInputCommandInteraction } from 'discord.js';
import prisma from '../prisma';

export default {
    data: new SlashCommandBuilder()
        .setName('cookiecheck')
        .setDescription('Check how many cookies you have, or another user.')
        .addUserOption(option => option.setName('user').setDescription('The user to check').setRequired(false)),
    execute: async (interaction: ChatInputCommandInteraction) => {
        // Check if user is mentioned, if not, check the author
        const user = interaction.options.getUser('user') || interaction.user;

        // Check if user exists in database, if it is display the number of cookies, if not, display 0
        const dbUser = await prisma.user.findFirst({
            where: {
                discordId: user.id,
                guildId: interaction.guildId!,
            },
        });

        await interaction.reply({
            content: `${user.username} has ${dbUser?.score || 0} cookie!`,
            ephemeral: true,
        });
    },
};