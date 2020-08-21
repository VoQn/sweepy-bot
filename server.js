const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

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
    let text = "```\n" +
    "酸素\n" +
    "作物の株数\n" +
    "液体の水圧\n" + 
    "```";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s液体の水圧/)){
    let text = "https://gyazo.com/19017bac9164b8dd1160d2590187591c";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s酸素/)){
    let text = "https://gyazo.com/75dea51d415b74b6082d75fcdda8f08d";
    sendMsg(message.channel.id, text);
    return;
  }
  if (message.content.match(/^\!tag\s作物の株数/)){
    let text = "https://gyazo.com/703af5dc05131d973eedf3f6280232f6";
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
