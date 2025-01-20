const axios = require('axios');

exports.default = {
    name: 'ping',
    async code(message) {
        try {
            const start = Date.now();
            await axios.get('https://api.revolt.chat');
            const embed = {
                description: `
                **Bot Latency**: ${Date.now() - message.createdAt}ms
                **API Latency**: ${Date.now() - start} ms`
            };

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await message.reply('コマンドの実行中にエラーが発生しました');
        }
    },
};