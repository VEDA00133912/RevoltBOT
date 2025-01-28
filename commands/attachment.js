exports.default = {
    name: 'image',
    async code(message) {
        await message.reply({ content: 'image', attachments: ['ファイルID']})
    }
};