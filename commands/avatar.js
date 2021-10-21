const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get a user's avatar.")
        .addUserOption(option => option.setName("target")
            .setDescription("The user to target.")
            .setRequired(false)),

    async execute(inter) {
        const user = inter.options.getUser("target");
        if (user) return inter.reply({ content: `${user.username}'s avatar: ${user.displayAvatarURL()}`, ephemeral: true }); 
        return inter.reply({content: `Your avatar: ${inter.user.displayAvatarURL()}`, ephemeral: true });
    }
}