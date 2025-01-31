const config = require('../config.json'); 
const { MiQ } = require('makeitaquote');
const axios = require('axios');

exports.default = {
  name: '<@01JEN5R7Y5WT4PK9Y643QBBR0Z>', 
  nonPrefixed: true,
  async code(message) {
    await message.channel.startTyping();

    const msgIds = message.replyIds || [];
    if (msgIds.length === 0) {
      return await message.reply('リプライ先のメッセージが見つかりません。').finally(() => message.channel.stopTyping());
    }

    try {
      const allMessages = await message.channel.fetchMessages();
      const replyMessages = allMessages.filter(msg => msgIds.includes(msg.id) && msg.content);

      if (replyMessages.length === 0) {
        return await message.reply('リプライ先のメッセージが見つかりません。').finally(() => message.channel.stopTyping());
      }

      for (const replyMessage of replyMessages) {
        let avatarBase64 = null;

        if (replyMessage.avatarURL) {
          try {
            const avatarURL = replyMessage.avatarURL.replace('?max_side=256', '/original');
            const avatarResponse = await axios.get(avatarURL, { responseType: 'arraybuffer' });
            avatarBase64 = `data:image/jpeg;base64,${Buffer.from(avatarResponse.data).toString('base64')}`;
          } catch (error) {
            console.error('アバター画像の取得に失敗:', error);
          }
        }

        const imageData = {
          text: replyMessage.content,
          avatar: avatarBase64,
          username: replyMessage.username || replyMessage.authorId,
          display_name: replyMessage.member?.displayName || replyMessage.username,
          color: message.content.includes('color'),
          watermark: config.watermark,
        };

        const miq = new MiQ().setFromObject(imageData, true);
        const response = await miq.generate();
        await message.reply(`**[生成しました！](${response})**`);
      }
    } catch (error) {
      console.error('コマンド実行中にエラー:', error);
      await message.reply('コマンドの実行中にエラーが発生しました');
    } finally {
      await message.channel.stopTyping();
    }
  },
};