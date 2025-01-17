const config = require('../config.json'); 
const { MiQ } = require('makeitaquote');
const axios = require('axios');

exports.default = {
  name: 'miq',
  async code(message) {
    const msgIds = message.replyIds; 

    try {
      const allMessages = await message.channel.fetchMessages();
      const replyMessages = allMessages.filter(msg => msgIds.includes(msg.id));

      for (const replyMessage of replyMessages) {
        let avatarBase64 = null;

        try {
          const avatarResponse = await axios.get(replyMessage.avatarURL, {
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
          color: false, 
          watermark: config.watermark, 
        };

        const miq = new MiQ().setFromObject(imageData, true);
        const response = await miq.generate(false); // リンクを取得したいのでfalseにしておく
        message.reply(response);
      }
    } catch (error) {
      console.error(`miqコマンド実行中にエラーが発生しました: ${error}`);
    }
  },
};
