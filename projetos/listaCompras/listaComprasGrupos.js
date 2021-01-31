const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

var dados = {}

const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`))
        , { columns: 3 }
    )
)

bot.start(async ctx => {
    let name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo ${name}!`)
    await ctx.reply('Escreva os itens que você deseja adicionar...')
})

bot.use((ctx, next) => {
    let chatId = ctx.chat.id
    if (!dados.hasOwnProperty(chatId)) dados[chatId] = []
    ctx.itens = dados[chatId]
    next()
})

bot.on('text', ctx => {
    let text = ctx.update.message.text
    if (text.startsWith('/')) text = text.substring(1)
    ctx.itens.push(text)
    ctx.reply(`${text} adicionado!`, gerarBotoes(ctx.itens))
})

bot.action(/delete (.+)/, ctx => {
    let index = ctx.itens.indexOf(ctx.match[1])
    if (index >= 0) ctx.itens.splice(index, 1)
    ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.itens))
})

bot.startPolling()