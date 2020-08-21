const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

const tags = [
  { tag: '酸素と人数', url: 'https://gyazo.com/75dea51d415b74b6082d75fcdda8f08d' },
  { tag: '作物の株数', url: 'https://gyazo.com/703af5dc05131d973eedf3f6280232f6' },
  { tag: '作物の適温', url: 'https://gyazo.com/9bc68e5a03f78600a18e63c82dcbecd6' },
  { tag: '気体の比重', url: 'https://gyazo.com/539b75221b72c0defc184ea84db0c7f9' },
  { tag: '液体の水圧', url: 'https://gyazo.com/19017bac9164b8dd1160d2590187591c' },
  { tag: '液体の比重', url: 'https://gyazo.com/7d5e226199facb9bb0e5b852d2210df1' },
  { tag: '移動チューブ', url: 'https://gyazo.com/161b5e104c43e12aeef3ddc36cfa04fb' },
  { tag: '液体クーラー', url: 'https://gyazo.com/06375d94aea03932592895cfc064dd1d' },
]

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
  if (message.content.match(/^\!help/)){
    let text = "`!help` で出来るコマンド一覧を出すよ\n" + 
        "`!tags` で使えるタグ一覧が出るよ\n" +
        "`!tag <半角スペース> <タグ名>` で応えられる範囲で答えるよ";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tags/)){
    const text = ["```", ...tags.map(o => o.tag) ,"```"].join("\n")
    // let text = "```\n" +
    // "酸素と人数\n" +
    // "作物の株数\n" +
    // "作物の適温\n" +
    // "気体の比重\n" +
    // "液体の水圧\n" +
    // "液体の比重\n" +
    // "移動チューブ\n" +
    // "液体クーラー\n" +
    // "```";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s気体の比重/)){
    let text = "https://gyazo.com/539b75221b72c0defc184ea84db0c7f9";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s液体の水圧/)){
    let text = "https://gyazo.com/19017bac9164b8dd1160d2590187591c";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s液体の比重/)){
    let text = "https://gyazo.com/7d5e226199facb9bb0e5b852d2210df1";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s酸素と人数/)){
    let text = "https://gyazo.com/75dea51d415b74b6082d75fcdda8f08d";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s作物の株数/)){
    let text = "https://gyazo.com/703af5dc05131d973eedf3f6280232f6";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s作物の適温/)){
    let text = "https://gyazo.com/9bc68e5a03f78600a18e63c82dcbecd6";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s移動チューブ/)){
    let text = "https://gyazo.com/161b5e104c43e12aeef3ddc36cfa04fb";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s液体クーラー/)){
    let text = "https://gyazo.com/06375d94aea03932592895cfc064dd1d";
    sendMsg(message.channel.id, text);
    return;
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

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
