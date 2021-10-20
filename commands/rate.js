const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { FetchFooter, ReadUserData, WriteUserData } = require('../global-functions');
const { embedColor } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rate")
        .setDescription("Rate a user's surreality!")
        .addUserOption(option => option.setName("target")
            .setDescription("The user to target.")
            .setRequired(false)),

    async execute(inter) {
        const user = inter.options.getUser("target");
        if (!user) user = inter.user; 
        let uD = ReadUserData(user.id);   

        if (!uD.rate) {
            uD.rate = Math.floor((Math.random()*5)+1);
            WriteUserData(user.id, uD);
            let fields = [`Nobody's asked me about ${user.username} before! Let's have a look...`, "Calculating..."];
        } else let fields = [`Someone's already asked about ${user.username}. One moment...`, "Fetching..."];

        loadingEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(fields[0])
            .addFields(
                { name:fields[1], value: "Please wait, this won't take long." }
            ).setFooter(FetchFooter())
    },
}