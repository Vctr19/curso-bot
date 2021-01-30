const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['Porco 🐷', 'Vaca 🐄', 'Carneiro 🐏'],
    ['Galinha 🐔', 'Ovo 🥚'],
    ['Peixe 🐟', 'Frutos do mar 🐙'],
    ['Eu sou vegetariano 🍆']
]).resize().extra()

bot.start(async ctx => {
    let name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply(`Qual bebida você prefere?`,
        Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra())
})

bot.hears(['Coca', 'Pepsi'], async ctx => {
  await ctx.reply(`Nossa, eu também gosto de ${ctx.match}`)
  await ctx.reply('Qual a sua carne predileta?', tecladoCarne)
})

bot.hears('Vaca 🐄', ctx => ctx.reply('É minha predileta també!'))
bot.hears('Eu sou vegetariano 🍆',
    ctx => ctx.reply('Parabéns, mas eu ainda prefiro carne 🍖'))
bot.on('text', ctx => ctx.reply('Legal!'))

bot.startPolling()