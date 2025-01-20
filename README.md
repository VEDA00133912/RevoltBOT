# RevoltBOT
[![NPM](https://nodei.co/npm/revolt.js.png?compact=true)](https://npmjs.org/package/revolt.js)
[![NPM](https://nodei.co/npm/revolthandler.js.png?compact=true)](https://npmjs.org/package/revolthandler.js)
[![NPM](https://nodei.co/npm/makeitaquote.png?compact=true)](https://npmjs.org/package/makeitaquote)
<br>
Revolt.chatで使用できるBOTです。Revolt.jsで書いています
# 使い方
.envを作成します
```
REVOLT_TOKEN= revoltのBOTのTOKENを入れる
```

config.jsonに必要事項の記入。
- owner : 自分のユーザーID
- prefix : コマンド用のプレフィックス
- watermark : make it a quoteの画像の右下に配置する文言。基本BOTのユーザー名でいいとおもう
```json
{
    "owner": "00000000000000000",
    "prefix": "r^",
    "watermark": "Test#0000"
}
```
必要なパッケージのインストール
```
npm i
```
実行
```
npm start
```

# コマンド
## Make it a Quote
### 通常
リプライ時に{BOTにメンション}をすれば生成されます<br>
![alt text](image-1.png)
### カラー
リプライ時に{BOTにメンション} colorと送ればカラーで生成されます<br>
![alt text](<image/Screenshot 2025-01-20 12.41.52.png>)
## Userinfo
r^userinfo {ユーザーをメンション}すればメンションされたユーザーの情報が表示されます<br>
![alt text](<image/Screenshot 2025-01-20 12.41.10.png>)
## ping
r^pingと送信するとpongを返すだけです<br>
![alt text](<image/Screenshot 2025-01-20 12.48.25.png>)