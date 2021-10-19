const { beanEmojiId, calls, clientId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(msg) {
        if (msg.author.bot) { return; } // Housekeeping

        if (msg.mentions.has(msg.client.user)) { msg.react(msg.guild.emojis.cache.get(beanEmojiId)); } // React with bean when mentioned (improved from Python)

        Object.entries(calls).forEach(([k,v]) => { // Call iter
            if(message.content.toLowerCase().contains(k)) { 
                msg.reply(v); 
            }
        });

         
    },
}