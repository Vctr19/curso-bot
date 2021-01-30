const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    let name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}!\nAvise se precisar de /ajuda`)
})

bot.command('ajuda', ctx => ctx.reply('Vou mostrar as opções:'
    + '\n/ajuda2: Teste via hears'
    + '\n/op2: Opção genéria'
    + '\n/op3: Outra opção genéria qualquer'))

bot.hears('/ajuda2', ctx => ctx.reply('Eu também consigo capturar comandos,'
    + ' mas utilize o /ajuda mesmo'))

bot.hears(/\/op(2|3)/i, ctx => ctx.reply('Resposta padrão para comandos genéricos'))

bot.startPolling()