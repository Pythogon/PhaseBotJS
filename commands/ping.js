const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js')
const { BeanEmojiId } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(inter) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("pingbutton")
                    .setLabel("This is a test button.")
                    .setStyle("SECONDARY")
                    .setEmoji("<:Phaser:719532394419585108>")
            );
        inter.reply({ content: "Pong!", components: [row], fetchReply: true});
    },
};