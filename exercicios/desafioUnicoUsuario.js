const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

// responde apenas a um usuario especifico, com id presente no .env
bot.start(ctx => {

    let msgId = ctx.update.message.from.id

    if (msgId === env.userId){
        ctx.reply('Ao seu dispor mestre!')
    } else {
        ctx.reply('sinto muito, mas eu só falo com o meu mestre!')
    }
})

bot.startPolling()