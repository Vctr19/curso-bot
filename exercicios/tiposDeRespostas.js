const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async ctx => {

    await ctx.reply(
        `Seja bem vindo ${ctx.update.message.from.first_name}! 😄`
    )

    await ctx.replyWithHTML(
        `Destacando mensagem <b>HTML</b>
        <i>de várias</i> <code>formas</code> <pre>possíveis</pre>
        <a href="https://google.com">Google</a>`
    )

    await ctx.replyWithMarkdown(
        'Destacando mensagem *Markdown* _de várias_ `formas` ```possíveis```'
        + '[Google](https://google.com)'
    )

    await ctx.replyWithPhoto({source: `${__dirname}/doggo.jpg`}, {caption: 'doggo <3'})

    await ctx.replyWithLocation(19.0154, 29.1549)

    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v')
})

bot.startPolling()