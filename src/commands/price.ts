import { SlashCommandBuilder, CommandInteraction, TextChannel, ActionRow, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import prisma from '../prisma';

export default {
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('Setup the bot for your server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(
            subcommand => subcommand
                .setName('add')
                .setDescription('Add a price')
                .addStringOption(option => option.setName('name').setDescription('The name of the price').setRequired(true))
                .addStringOption(option => option.setName('description').setDescription('The description of the price').setRequired(true))
                .addIntegerOption(option => option.setName('score').setDescription('The score of the price').setRequired(true))
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('remove')
                .setDescription('Remove a price')
                .addStringOption(option => option.setName('name').setDescription('The name of the price').setRequired(true))
        ),
    execute: async (interaction: ChatInputCommandInteraction) => {
        // Check subcommand
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const name = interaction.options.getString('name');
            const description = interaction.options.getString('description');
            const score = interaction.options.getInteger('score');

            if (!name || !description || !score) return;

            // Check if price already exists, if not create it
            const price = await prisma.price.findFirst({
                where: {
                    name: name,
                    guildId: interaction.guildId!,
                },
            });

            if (price) {
                await interaction.reply({
                    content: 'This price already exists.',
                    ephemeral: true,
                });
                return;
            }

            await prisma.price.create({
                data: {
                    name: name,
                    description: description,
                    level: score,
                    guildId: interaction.guildId!,
                },
            });

            await interaction.reply({
                content: 'Price added.',
                ephemeral: true,
            });
        } else {
            const name = interaction.options.getString('name');

            if (!name) return;

            // Check if price already exists, if not create it
            const price = await prisma.price.findFirst({
                where: {
                    name: name,
                    guildId: interaction.guildId!,
                },
            });

            if (!price) {
                await interaction.reply({
                    content: 'This price does not exist.',
                    ephemeral: true,
                });
                return;
            }

            await prisma.price.delete({
                where: {
                    id: price.id,
                    guildId: interaction.guildId!,
                },
            });

            await interaction.reply({
                content: 'Price deleted.',
                ephemeral: true,
            });
        }
    },
};