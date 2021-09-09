import type { IncomingMessage } from "http"

const https = require('https')

export interface ITelegramSendTextToChatResponse {
  ok: boolean
  result: {
    message_id: number
    from: {
      id: number
      is_bot: boolean
      first_name: string
      username: string
    }
    chat: {
      id: number
      title: string
      type: string
      all_members_are_administrators: true
    }
    date: number
    text: string
  }
}

export default function (opts: { text: string; botId: string; chatId: number }) {
  return new Promise<ITelegramSendTextToChatResponse>((resolve, reject) => {
    if (!opts || !opts?.botId || !opts?.chatId || !opts?.text) return reject(new Error('all params are required'))
    try {
      https
        .get(`https://api.telegram.org/bot${opts.botId}/sendMessage?chat_id=${opts.chatId}&text=${opts.text}`, (resp:IncomingMessage) => {
          let data = ''
          resp.on('data', (chunk: string) => {
            data += chunk
          })
          resp.on('end', () => {
            try {
              const answer: ITelegramSendTextToChatResponse = JSON.parse(data)
              if (!answer.ok) return reject(new Error('wrong answer from telegram'))
              return resolve(answer)
            } catch (err) {
              console.error('malformed answer', data)
              return reject(err)
            }
          })
        })
        .on('error', (err: Error) => {
          console.log('Error: ' + err.message)
          return reject(err)
        })
    } catch (err) {
      console.error(err)
      return reject(err)
    }
  })
}
