const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { embedColor } = require('../config.json');
const { FetchFooter } = require('../global-functions')
const { version } = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info about PhaseBot'),

    async execute(inter) {
        embed = new MessageEmbed()
            .setTitle(`About PhaseBot JSv${version}`)
            .setColor(embedColor)
            .addFields(
                {name:"Origins", value:"PhaseBot's original Python 3 release was created on July 4, 2020 for LIFE: The Game. This is the JavaScript port of the bot, started October 18, 2021."},
                {name:"Developer", value:"This bot was created by [Pythogon Technologies](https://github.com/Pythogon). The Python version of the bot has had extensive support from [Th3T3chn0G1t](https://github.com/Th3T3chn0G1t) on Github."},
                {name: "GitHub", value: "You can find the bot [here](https://github.com/Pythogon/PhaseBotJS), and the original Python bot [here](https://github.com/Pythogon/PhaseBot). The Python version is not actively maintained, but all help on the JS version is appreciated! Feel free to send a PR."},
            ).setFooter(FetchFooter());
        inter.reply({ embeds: [embed], ephemeral: true });
    }
}