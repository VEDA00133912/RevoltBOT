const { EmbedBuilder } = require('revolthandler.js');

exports.default = {
    name: 'serverinfo',
    guildOnly: {
        errorMsg(message) {
            message.reply('このコマンドはサーバー内でのみ使えます');
        },
    },
    async code(message) {
        try {
            const s = message.channel.server;    
            const memberCount = await s.fetchMembers();
            const formatDate = (date) => {
                return new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false }).replace(/\//g, '/').replace(',', '');
              };

              const embed = new EmbedBuilder()
                .setTitle(`${s.name}のサーバー情報`)
                .setDescription(`
                    **サーバーID**: ${s.id}\n
                    **鯖主**: ${s.owner}\n
                    **作成日**: ${formatDate(s.createdAt)}\n
                    **メンバー数**: ${memberCount.members.length}\n
                    **チャンネル数**: ${Object.keys(message.channel.server.channels || []).length}
                `)
                .setIconUrl(s.iconURL)
                .setColour('#7289DA');

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('エラー:', error);
            message.reply('コマンド実行中にエラーが発生しました');
        }
    },
};
