const { version } = require('../package.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence( {
			activities: [{
				name: `with Thea | JSv${version}`,
				type: "PLAYING",
			}]
		})
	},
};