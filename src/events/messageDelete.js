const { Events, Collection } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.partial || message.author?.bot) return;

        try {
            const client = message.client;
            if (!client.snipedMessages) {
                client.snipedMessages = new Collection();
            }

            client.snipedMessages.set(message.channel.id, {
                content: message.content,
                authorTag: message.author.tag,
                authorAvatar: message.author.displayAvatarURL(),
                channelName: message.channel.name,
                deletedAt: new Date(),
                attachments: message.attachments.map(att => att.url)
            });
        } catch (snipeError) {
            console.error('Error storing sniped message:', snipeError);
        }
    },
};
