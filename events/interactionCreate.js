module.exports = {
    name: "interactionCreate",
    async execute(inter) {
        if (!inter.isCommand()) return;

        const command = inter.client.commands.get(inter.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(inter);
        } catch (error) {
            console.error(error);
            return inter.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}