#!/usr/bin/node

import fs from 'fs'
import os from 'os'
import path from 'path'
import sendTelegramMessage from '..'

// console.log(process.argv)

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let lastArgv: string

try {
  const appConfigFile = path.join(os.homedir(), '.telegrammessagebot')
  let config: {
    currentChatId: number
    botId: string
    chats: { label: string; chatId: number }[]
  }
  try {
    config = JSON.parse(fs.readFileSync(appConfigFile, 'utf-8'))
  } catch (err) {
    config = {
      currentChatId: 0,
      botId: '',
      chats: []
    }
    fs.writeFileSync(appConfigFile, JSON.stringify(config, null, 2))
  }

  if (!config.botId) throw new Error('botId not configured')
  if (!config.currentChatId) throw new Error('chatId not configured')

  const currentChat = config.chats.find(f => f.chatId === config.currentChatId)

  rl.question('(' + currentChat.label + ') TEXT: ', function (txt: string) {
    console.log('--- START SEND TELEGRAM MESSAGE ---')

    lastArgv = txt

    const text = '[' + os.userInfo().username + '@' + os.hostname + ']: ' + lastArgv
    const botId = config.botId
    const chatId = config.currentChatId

    console.log('text: ' + text)
    console.log('botId: ' + botId)
    console.log('chatId: ' + chatId)

    sendTelegramMessage({ text, botId, chatId })
      .then(data => {
        console.log('message sent!')
        console.log('response:', data)

        console.log('--- END SEND TELEGRAM MESSAGE OK ---')
        process.exit(0)
      })
      .catch(err => {
        console.error('error on sending message!!!')

        console.error(err)

        console.log('--- END SEND TELEGRAM MESSAGE ERROR ---')
        process.exit(1)
      })
  })

  rl.on('error', function (err: Error) {
    console.error(err)
    process.exit(1)
  })

  rl.on('close', function () {
    console.log('\nBYE BYE !!!')
    process.exit(2)
  })
} catch (err) {
  console.error(err)

  console.log('--- END SEND TELEGRAM MESSAGE ERROR ---')
}
