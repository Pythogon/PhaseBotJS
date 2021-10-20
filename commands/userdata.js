const { SlashCommandBuilder } = require('@discordjs/builders');
const { developerId } = require('../config.json');
const { ReadUserData } = require('../global-functions');
permissions = [
    {
        id: developerId,
        type: "ROLE", 
        permission: true,
    },
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userdata")
        .setDescription("Read user's data")
        .addUserOption(option => option.setName("target")
            .setDescription("Target user")
            .setRequired(true)),

    async execute(inter) {
        user = inter.options.getUser("target");
        ud = ReadUserData(user.id);
        await inter.reply({ content: JSON.stringify(ud), ephemeral: true }); 
    },
}