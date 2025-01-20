const config = require('../config.json'); 
const { MiQ } = require('makeitaquote');
const axios = require('axios');

exports.default = {
  name: '<@01JEN5R7Y5WT4PK9Y643QBBR0Z>', // BOTのメンション
  nonPrefixed: true,
  async code(message) {
    await message.channel.startTyping();
    const msgIds = message.replyIds; 

    try {
      const allMessages = await message.channel.fetchMessages();
      const replyMessages = allMessages.filter(msg => msgIds.includes(msg.id));

      for (const replyMessage of replyMessages) {
        let avatarBase64 = null;

        try {
          // サイズが256だとガビガビになっちゃうので元画像を取得しておく
          const avatarURL = replyMessage.avatarURL.replace('?max_side=256', '/original');
          const avatarResponse = await axios.get(avatarURL, {
            responseType: 'arraybuffer',
          });
          avatarBase64 = `data:image/jpeg;base64,${Buffer.from(avatarResponse.data).toString('base64')}`;
        } catch (avatarError) {
          console.error(`アバターのbase64への変換に失敗しました:`, avatarError);
        }

        const imageData = {
          text: replyMessage.content,
          avatar: avatarBase64, 
          username: replyMessage.username || replyMessage.authorId, 
          display_name: replyMessage.member.displayName || replyMessage.username,
          color: message.content.includes('color'),  // colorが含まれていればtrue
          watermark: config.watermark, 
        };

        const miq = new MiQ().setFromObject(imageData, true);
        const response = await miq.generate(true);
        await message.reply(response);
        await message.channel.stopTyping();
      }
    } catch (error) {
      console.error(`miqコマンド実行中にエラーが発生しました: ${error}`);
    }
  },
};
