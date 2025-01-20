exports.default = {
    name: 'ping',
    code(message) {
        try {
            message.reply('🏓Pong!');
        } catch (error) {
            console.error(error);
            message.reply('コマンドの実行中にエラーが発生しました');
        }
    },
};