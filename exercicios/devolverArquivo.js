const env = require('../.env')
const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf(env.token)

bot.on('voice', async ctx => {
    let id = ctx.update.message.voice.file_id
    let res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithVoice({url: `${env.apiFileUrl}/${res.data.result.file_path}`})
})

bot.on('photo', async ctx => {
    let id = ctx.update.message.photo[0].file_id
    let res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithPhoto({url: `${env.apiFileUrl}/${res.data.result.file_path}`})
})

bot.startPolling()