const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../config.json');
const { FetchFooter, ReadUserData } = require('../global-functions');
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
        let em = undefined;
        switch(inter.options.getSubcommand()) {
            case "user":
                const member = inter.options.getMember("target");
                const user = member.user;
                const uD = ReadUserData(user.id);
                let joined_at = new Date(user.createdAt).toLocaleString("en-GB");
                let joined_guild_at = new Date(member.joinedAt).toLocaleString("en-GB");

                if (!uD.balance) uD.balance = "0";
                if (!uD.rate) uD.rate = "Unknown";
                if (!uD.laststar) uD.laststar = "Never used";
                if (!uD.starcount) uD.starcount = "0";
                if (!uD.role) uD.role = "None";
                if (!uD.inventory) uD.inventory = "Empty";

                em = new MessageEmbed()
                    .setColor(embedColor)
                    .setTitle(`Userdata for ${user.username}`)
                    .addFields(
                        { name: "Username",value: user.username, inline: true },
                        { name: "User ID", value: user.id, inline: true },
                        { name: "Joined guild on", value: joined_guild_at, inline: true },
                        { name: "Joined Discord on", value: joined_at, inline: true },
                        { name: "Surreal rating", value: uD.rate, inline: true },
                        { name: "Role ID", value: uD.role, inline: true},
                        { name: "Last /superstar", value: uD.laststar, inline: true},
                        { name: "Starcount", value: uD.starcount, inline: true},
                        { name: "Balance", value: uD.currency, inline: true},
                        { name: "Inventory", value: uD.inventory, inline: true},
                    ).setFooter(FetchFooter())
                inter.reply({embeds: [em], ephemeral: true });
                break;

            case "guild":
                let gl = inter.guild;
                let owner_name = gl.members.fetch(gl.ownerId).username;
                let created_at = new Date(gl.createdAt).toLocaleString("en-GB");
                em = new MessageEmbed()
                    .setColor(embedColor)
                    .setTitle("Metrics for this guild")
                    .addFields(
                        {name: "User count", value: gl.memberCount},
                        {name: "Guild created on", value: created_at},
                        {name: "Channel count", value: gl.channels.length},
                        {name: "Role count", value: gl.roles.length},
                        {name: "Server owner", value: owner_name},
                    ).setFooter(FetchFooter())
                inter.reply({embeds: [em], ephemeral: true})
                break;

        }
    }
}