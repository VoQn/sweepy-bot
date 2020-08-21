const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

//const TagCommand = require('./commands/tag_command');

const commands = [
  { command: '!help', get help() { return `\`${this.command}\` _応えられるコマンド一覧を出すよ_`; }  },
  { command: '!tags', get help() { return `\`${this.command}\` _使えるタグ一覧を出すよ_`; } },
  { command: '!tag', get help() { return `\`${this.command} <スペース> <タグ名> \` _応えられる範囲で答えるよ_`; } },
  { command: '!emoji', get help() { return `\`${this.command} <スペース> <絵文字>\` _あるなら絵文字コード答えるよ_`} }
];

const tags = [
  { tag: '酸素と人数', url: 'https://gyazo.com/75dea51d415b74b6082d75fcdda8f08d' },
  { tag: '作物の株数', url: 'https://gyazo.com/703af5dc05131d973eedf3f6280232f6' },
  { tag: '作物の適温', url: 'https://gyazo.com/9bc68e5a03f78600a18e63c82dcbecd6' },
  { tag: '気体の比重', url: 'https://gyazo.com/539b75221b72c0defc184ea84db0c7f9' },
  { tag: '液体の水圧', url: 'https://gyazo.com/19017bac9164b8dd1160d2590187591c' },
  { tag: '液体の比重', url: 'https://gyazo.com/7d5e226199facb9bb0e5b852d2210df1' },
  { tag: '移動チューブ', url: 'https://gyazo.com/161b5e104c43e12aeef3ddc36cfa04fb' },
  { tag: '液体クーラー', url: 'https://gyazo.com/06375d94aea03932592895cfc064dd1d' },
];

const emojis = [
  { name: 'セイジハッチ', code: 'sagehatch' },
  { name: 'ハッチ', code: 'hatch'},
  { name: 'ピップ', code: 'pip'},
  { name: 'ポークシェル', code: 'pokeshell'},
  { name: 'スリックスター', code: 'slickster'},
  { name: 'とろとろスリックスター', code: 'moltenslickster' },
  { name: 'ふさふさスリックスター', code: 'longhairslickster' }
];



function getCustomEmojiMessage(code) {
  return client.emojis.find( "name", code ).toString() + " " +  `\`:${code}:\``;
}

http.createServer(function(req, res){
  if (req.method == 'POST'){
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

client.on('ready', message =>{
  console.log('Bot準備完了～');
  client.user.setPresence({ game: { name: '人生' } });
});

client.on('message', message =>{
  
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  if(message.isMemberMentioned(client.user)){
    sendReply(message, "人生を満喫中さ、わかるだろ？");
    return;
  }
  
  const msg = getMessage(message.content);
  sendMsg(message.channel.id, msg);
  return;
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );


function getMessage(context){
  
  // ヘルプタグ
  if (context.match(/^\!help/)){
  // ↑ command に委譲したい
    return commands.map(command => command.help);
  }
  
  // タグ一覧
  if (context.match(/^\!tags/)){
    return ["```", ...tags.map(o => o.tag) ,"```"].join("\n");
  }
  
  // タグの返答
  const m = context.match(/^\!tag\s+(?<arg>\S+)/);
  if (m) {
    const arg = m.groups.arg;
    
    if (!arg) {
      return 'なんのこと？'
    }

    if (arg.length < 2) {
      return 'もうちょっとヒントちょうだい (2文字以上欲しがっています)';
    }
    
    // tagと完全一致検索する
    for(const { tag, url } of tags) {
      if (tag == arg) {
        return url;
      }
    }

    // 逆に、tagの部分文字列にマッチする。
    const choice = tags.filter(o => o.tag.match(arg))
    if (choice.length === 1) {
      const suggestedURL = choice[0].url;
      return ["もしかして、これ？", "```", ...choice.map(o => o.tag), "```", suggestedURL].join("\n");
    }
    if (choice.length > 0) {
      return ["複数あるよ。聞き直してね。", "```", ...choice.map(o => o.tag), "```"].join("\n");
    }

    return 'なんのこと？';
  }
  
  // 絵文字の返答
  const e = context.match(/^\!emoji\s+(?<arg>\S+)/);
  if (e) {
    const arg = e.groups.arg;
    if (!arg) {
      return 'なんのこと？'
    }

    if (arg.length < 2) {
      return 'もうちょっとヒントちょうだい (2文字以上欲しがっています)';
    }
    
    for(const { name, code } of emojis) {
      if (name == arg) {
        return getCustomEmojiMessage(code);
      }
    }

    // 逆に、emojiの部分文字列にマッチする。
    const choice = emojis.filter(o => o.name.match(arg))
    if (choice.length === 1) {
      const code = choice[0].code;
      if(code === arg){
        return getCustomEmojiMessage(code);
      } else {
        const suggested = getCustomEmojiMessage(code);
        return ["もしかして、これ？", "```", ...choice.map(o => o.name), "```", suggested].join("\n");
      }
    }
    if (choice.length > 1) {
      return ["複数あるよ。聞き直してね。", "```", ...choice.map(o => o.name), "```"].join("\n");
    }
    return 'なんのこと？';
  }
}

function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
