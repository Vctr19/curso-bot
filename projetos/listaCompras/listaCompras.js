const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

var lista = []

const gerarGotoes = () => Extra.markup (
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        {columns: 3}
    )
)

bot.start(async ctx => {
    let name = ctx.update.message.from.first_name
    await ctx.reply(`Bem vindo ${name}!`)
    await ctx.reply('Escreva os itens que você deseja adicionar...')
})

bot.on('text', ctx => {
    lista.push(ctx.message.text)
    ctx.reply(`${ctx.update.message.text} adicionado!`, gerarGotoes())
})

bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado!`, gerarGotoes())
})

bot.startPolling()