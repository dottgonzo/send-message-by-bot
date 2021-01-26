#!/usr/bin/node

import fs from 'fs'
import os from 'os'
import path from 'path'
import sendTelegramMessage from '..'

// console.log(process.argv)

console.log('--- START SEND TELEGRAM MESSAGE ---')

try {
  const appConfigFile = path.join(os.homedir(), '.telegrammessagebot')
  let config: {
    chatId: number
    botId: string
  }
  try {
    config = JSON.parse(fs.readFileSync(appConfigFile, 'utf-8'))
  } catch (err) {
    config = {
      chatId: 0,
      botId: ''
    }
    fs.writeFileSync(appConfigFile, JSON.stringify(config, null, 2))
  }

  if (!config.botId) throw new Error('botId not configured')
  if (!config.chatId) throw new Error('chatId not configured')

  const lastArgv = process.argv.filter(f => !f.includes('/'))
  const text = lastArgv[lastArgv.length - 1]
  const botId = config.botId
  const chatId = config.chatId

  console.log('text: ' + text)
  console.log('botId: ' + botId)
  console.log('chatId: ' + chatId)

  console.log('---- sending message...')

  sendTelegramMessage({ text, botId, chatId })
    .then(data => {
      console.log('message sent!')
      console.log('response:', data)

      console.log('--- END SEND TELEGRAM MESSAGE OK ---')
    })
    .catch(err => {
      console.error('error on sending message!!!')

      console.error(err)

      console.log('--- END SEND TELEGRAM MESSAGE ERROR ---')
    })
} catch (err) {
  console.error(err)

  console.log('--- END SEND TELEGRAM MESSAGE ERROR ---')
}