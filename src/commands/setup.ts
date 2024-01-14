import { SlashCommandBuilder, CommandInteraction, TextChannel, ActionRow, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup the bot for your server.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to setup the cookie clicker').setRequired(false)),
    execute: async (interaction: CommandInteraction) => {
        // TODO: Create a cookie clicker in the channel, put an cookie image + 2 buttons in reaction one to view how many cookies you have and one to click the cookie
        // At each interaction, send an ephemeral message with the number of cookies you have
        // If you click the cookie, add 1 cookie to your total
        // If you click the view button, send an ephemeral message with the number of cookies you have
        const guild = interaction.guild;
        if (!guild) return;

        let textChannel = interaction.channel as TextChannel;
        
        const channelOpt = interaction.options.get('channel');
        if (channelOpt) {
            const channelId = channelOpt.channel?.id;
            if (!channelId) return;
            const channel = await guild.channels.fetch(channelId!);
            if (!channel || !channel.isTextBased()) return;
            textChannel = channel as TextChannel;
        }
        //const textChannel = channel as TextChannel;


        // Add cookie button to message
        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                {
                    type: ComponentType.Button,
                    customId: 'add_cookie',
                    style: ButtonStyle.Primary,
                    label: '🍪 Add Cookie',
                },
                {
                    type: ComponentType.Button,
                    customId: 'view_cookie',
                    style: ButtonStyle.Secondary,
                    label: '👀 View Cookie',
                },
                {
                    type: ComponentType.Button,
                    customId: 'leaderboard',
                    style: ButtonStyle.Secondary,
                    label: '🏆 Leaderboard',
                },
                {
                    type: ComponentType.Button,
                    customId: 'prices',
                    style: ButtonStyle.Secondary,
                    label: '🎁 Prices',
                }
            ],
        });

        if (textChannel.id === interaction.channelId) {
            return await interaction.reply({
                content: 'Click the cookie to get cookies and earn prices!',
                components: [row],
            });
        }
        
        // Send cookie image in channel with a text message
        await textChannel.send({
            content: 'Click the cookie to get cookies and earn prices!',
            components: [row],
        });

        await interaction.reply({
            content: 'Done! Check the channel to see your cookie clicker!',
            ephemeral: true,
        });
    },
};