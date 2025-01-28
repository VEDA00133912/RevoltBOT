exports.default = {
    name: 'ping',
    async code(message) {
        try {
            const start = Date.now();
            const reply = await message.reply('🏓 Pong!');
            const end = Date.now();

            const embed = {
                description: `
                **Bot Latency**: ${end - message.createdAt}ms
                **API Latency**: ${end - start}ms`
            };

            
            await reply.edit({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await message.reply('コマンドの実行中にエラーが発生しました');
        }
    },
};