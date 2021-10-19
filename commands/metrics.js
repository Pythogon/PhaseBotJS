const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("metrics")
        .setDescription("Get information!")

        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("Information about the user")
                .addUserOption(option => option.setName("target")
                    .setDescription("The user").
                    setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
                .setName("guild")
                .setDescription("Information about the guild")),

    async execute(inter) {
        if(inter.options.getSubcommand() === "user") { 
            const member = inter.options.getMember("target");
            const user = member.user;
            let joined_at = new Date(user.createdAt).toLocaleString("en-GB");
            let joined_guild_at = new Date(member.joinedAt).toLocaleString("en-GB");
            const em = new MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Userdata for ${user.username}`)
                .addFields(
                    { name: "Username",value: user.username, inline: true },
                    { name: "Joined guild at", value: joined_guild_at, inline: true },
                    { name: "Joined Discord at", value: joined_at, inline: true }
                )
            inter.reply({content: "Here you are!", embeds: [em], ephemeral: true });
        }
    }
}