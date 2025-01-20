exports.default = {
  name: "userinfo",
  async code(message, args) {
    const userId = args[0] ? args[0].replace(/<@!?(.*?)>/, "$1") : message.authorId;

    const server = message.server;
    if (!server) {
      return message.reply("サーバー情報が取得できません");
    }

    try {
      const { members, users } = await server.fetchMembers(userId);
      const member = members.find(m => m.id.user === userId); 
      if (!member) {
        return message.reply("指定されたユーザーがサーバーにいません");
      }

      const user = users.find(u => u.id === userId);
      if (!user) {
        return message.reply("ユーザー情報が見つかりません");
      }

      const formatDate = (date) => {
        return new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false }).replace(/\//g, '/').replace(',', '');
      };
      
      const embed = {
        type: 'Text',
        icon_url: user.avatarURL,
        title: `${member.displayName}のユーザー情報`,
        description: `
        **ユーザー名**: ${user.username}#${user.discriminator}\n
        **ID**: ${user.id}\n
        **アカウント作成日**: ${formatDate(user.createdAt)}\n
        **サーバー参加日**: ${formatDate(member.joinedAt)}\n
        **ステータス**: ${user.presence}`,
        colour: "#7289DA",
      };

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error("エラー:", error);
      await message.reply("コマンド実行中にエラーが発生しました");
    }
  },
};
