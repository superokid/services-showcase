import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
dotenv.config();
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { DISCORD_TOKEN } = process.env;

bot.login(DISCORD_TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user?.tag}!`);
});

bot.on('message', (msg) => {
  console.log(msg);
  if (msg.content === '!hi') {
    msg.reply('hallooo');
  }
});
