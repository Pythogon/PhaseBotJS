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
        let uN = user.username;
        let fields = [];

        if (!uD.rate) {
            uD.rate = Math.floor((Math.random()*5)+1);
            WriteUserData(user.id, uD);
            fields = [`Nobody's asked me about ${uN} before! Let's have a look...`, "Calculating..."];
        } else fields = [`Someone's already asked about ${uN}. One moment...`, "Fetching..."];

        loadingEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(fields[0])
            .addFields(
                { name:fields[1], value: "Please wait, this won't take long." }
            ).setFooter(FetchFooter());
        inter.reply( {embeds:[loadingEmbed]} );
        
        let result = [];
        switch(uD.rate) {
            case -1:
                result = [`Error 404: ${uN} not found.`, '#ffffff', '☆'];
                break;
            case 1:
                result = [`${uN} is a lowly triangle, 1/10, not very surreal.`,'#5fa8ff','★☆☆☆☆'];
                break;
            case 2:
                result = [`${uN} seems to be a square - they should visit the Void more often.`,"#fffc00",'★★☆☆☆'];
                break;
            case 3:
                result = [`${uN} is a line. Infinite potential for surrealitude, but they're trapped behind their one dimensional view.`, '#ffc000','★★★☆☆'];
                break;
            case 4:
                result = [`I think ${uN} is a sphere, solidly surreal.`, "#ff6000", '★★★★☆'];
                break;
            case 5:
                result = [`${uN} is a hypercube, probably working with the surreal council (hide your illegalities).`,"#ff3030",'★★★★★'];
                break;
            case 6:
                result = [`{uN} is the void itself. What did you expect?`,"#ff0000",'★★★★★★'];
                break;
            default:
                result = ['{} is undefined. You shouldn\'t be seeing this message! Tell Ash about it.',"#000000",'?']
        }
        
        resultEmbed = new MessageEmbed()
            .setTitle(result[0])
            .setColor(result[1])
            .addFields(
                {name: `Rating: ${result[2]}`, value:"Do you want to know what I think about someone? Do /rate!"},
            ).setFooter(FetchFooter())
        setTimeout(() => {inter.editReply({embeds: [resultEmbed]})}, 2000);
    },
}