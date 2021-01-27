const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

// bot responde ao comando /start
bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Seja bem vindo ${from.first_name}!`)
})

// bot responde a acao do primeiro parametro, no caso a um texto
bot.on('text', async (ctx, next) => {
    await ctx.reply('resposta 1')
    next()
})

// final da cadeia de respostas, se chamado ao next()
bot.on('text', async ctx => await ctx.reply('resposta 2'))

// inicia o bot
bot.startPolling()