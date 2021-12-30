const { Router } = require("express");
const router = new Router();

const { Database } = require("beta.db")
const db = new Database('./settings/config.json');
const API = new Database('./settings/api.json');

const Discord = require('discord.js')
const client = new Discord.Client()

client.login(db.get('BOT').TOKEN || process.env.TOKEN)

client.on("ready", async () => {
    console.log('CONNETED TO : ' + client.user.tag);

    setInterval(() => {
        const user = client.users.cache.get(db.get('BOT').USER)

        if (user.presence.activities[0] !== 'CUSTOM_STATUS') {
            if (user.presence.activities[0] && user.presence.activities[0].assets) {
                API.clear()
                var API_VALUE = {
                    'INFO': {
                        'NAME': user.username,
                        'STATUS': user.presence.status || 'N/A',
                        'AVATAR': user.displayAvatarURL({ size: 2048, format: 'jpg' }),
                    },
                    'ACTIVITY': {
                        'TYPE': user.presence.activities[0].type || 'N/A',
                        'NAME': user.presence.activities[0].name || 'N/A',
                        'STATE': user.presence.activities[0].state || 'N/A',
                        'DETAILS': user.presence.activities[0].details || 'N/A',
                        'ASSETS': {
                            'SMALLIMAGEURL': user.presence.activities[0].assets.smallImageURL({ size: 2048, format: 'jpg' }) || 'https://icons.veryicon.com/png/o/miscellaneous/unicons/n-a.png',
                            'SMALLTEXT': user.presence.activities[0].assets.smallText,
                            'LARGEIMAGEURL': user.presence.activities[0].assets.largeImageURL({ size: 2048, format: 'jpg' }) || 'https://icons.veryicon.com/png/o/miscellaneous/unicons/n-a.png',
                            'LARGETEXT': user.presence.activities[0].assets.largeText,
                        }
                    },
                }
            } else {
                API.clear()
                var API_VALUE = {
                    'INFO': {
                        'NAME': user.username,
                        'STATUS': user.presence.status || 'N/A',
                        'AVATAR': user.displayAvatarURL({ size: 2048, format: 'jpg' }),
                    }
                }
            }

        }


        API.set('USER', API_VALUE)
        console.log('API PATH DATA UPDATED');

    }, 1000);
})

router.get("/", (req, res) => {
    const config = db.all();
    const DATA = API.all()
    res.render("index", {
        config,
        DATA,
        layout: "./"
    });
});

module.exports = router;
