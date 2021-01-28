const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    let name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo ${name}!`)
})

// Exemplos de alguns eventos que o bot pode responder
bot.on('text', ctx => {
    let text = ctx.update.message.text
    ctx.reply(`Texto '${text}' recebido com sucesso!`)
})

bot.on('location', ctx => {
    let location = ctx.update.message.location
    console.log(location)
    ctx.reply(`Entendido, vocês está em
        Lat:  ${location.latitude}
        Lon:  ${location.longitude}!`)
})

bot.on('contact', ctx => {
    let contact = ctx.update.message.contact
    console.log(contact)
    ctx.reply(`Vou lembrar do(a) ${contact.first_name} (${contact.phone_number})`)
})

bot.on('voice', ctx => {
    let voice = ctx.update.message.voice
    console.log(voice)
    ctx.reply(`Audio recebido, ele possui ${voice.duration} segundos`)
})

bot.on('photo', ctx => {
    let photo = ctx.update.message.photo
    console.log(photo)
    photo.forEach((ph, i) => {
        ctx.reply(`Foto ${i} tem resolução de ${ph.width}x${ph.height}`)
    })
})

bot.on('sticker', ctx => {
    let sticker = ctx.update.message.sticker
    console.log(sticker)
    ctx.reply(`Estou vendo que você enviou o ${sticker.emoji} do conjunto ${sticker.set_name}`)
})

bot.startPolling()