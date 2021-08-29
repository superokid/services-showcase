import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import Tatsu from 'tatsu';

dotenv.config();
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { DISCORD_TOKEN, TATSU_TOKEN = '', GUILD_ID = '' } = process.env;

const tatsu = Tatsu(TATSU_TOKEN);

bot.login(DISCORD_TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user?.tag}!`);
});

bot.on('messageCreate', async (msg) => {
  try {
    if (msg.content === '!hi') {
      msg.reply('hallooo');
    }
    if (msg.content === '!leaderboard') {
      const tatsuRes = await tatsu.getGuildRankings(GUILD_ID);
      const tatsuRes10 = tatsuRes.slice(0, 10);

      //   const userIds = tatsuRes10.map((item) => item.user_id);
      //   const profiles = await getProfileByIds(userIds);
      //   const profileRanks = mergeGuildRankingAndProfile(tatsuRes10, profiles.slice());
      //   console.log({ profileRanks });

      msg.reply({
        content: 'Viewing leaderboard',
        tts: false,
        embeds: [
          {
            type: 'rich',
            title: `Leaderboard`,
            description: '',
            color: 0x00ffff,
            fields: tatsuRes10.map((item) => ({
              name: `Rank ${item.rank}`,
              value: `${item.user_id} (${item.score} points)`,
            })),
          },
        ],
      });
    }
  } catch (err) {}
});

function getProfileByIds(userIds: string[]) {
  const pmProfiles = userIds.map((id) => tatsu.getProfile(id));
  return Promise.all(pmProfiles);
}

interface ProfilesObj {
  [key: string]: Tatsu.MemberRanking | Tatsu.UserProfile;
}

function mergeGuildRankingAndProfile(
  profilesGuild: Tatsu.MemberRanking[],
  profilesMember: Tatsu.UserProfile[]
) {
  const profiles: ProfilesObj = {};
  for (let profile of profilesGuild) {
    profiles[profile.user_id] = profile;
  }
  for (let profile of profilesMember) {
    profiles[profile.id] = { ...profiles[profile.id], ...profile };
  }
  return Object.values(profiles);
}
