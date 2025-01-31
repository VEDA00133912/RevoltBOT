const { EmbedBuilder } = require('revolthandler.js');

exports.default = {
    name: 'help',
    async code(message) {
        const embed = new EmbedBuilder()
        .setTitle('ヘルプ')
        .setColor('#7289DA')
        .setDescription(`
            **コマンド一覧**
            - <@01JEN5R7Y5WT4PK9Y643QBBR0Z>\n返信するときにメンションをするとMake it a Quoteを生成します。\nメンションの横にcolorとつけるとカラー生成をします
            - **r^help**\nこれを出す
            - **r^ping**\nping値を表示します
            - **r^serverinfo**\nサーバー情報を表示します
            - **r^userinfo メンション**\nメンションしたユーザーの情報を表示します
            `)
        await message.reply({ embeds: [embed]})
    }
};