#!/usr/bin/node

import fs from 'fs'
import os from 'os'
import path from 'path'

// console.log(process.argv)

try {
  const lastArgv = process.argv.filter(f => !f.includes('/'))
  const newChatLabel = lastArgv[lastArgv.length - 1]

  console.log('--- SWITCH TELEGRAM CHAT TO ' + newChatLabel + ' ---')

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

  const chatId = config.currentChatId

  const newChat = config.chats.find(f => f.label.replace(/ /g, '') === newChatLabel.replace(/ /g, ''))

  if (!newChat) throw new Error('chatId not found on chat list')

  console.log('old chatId: ' + chatId)
  console.log('new chatId: ' + newChat.chatId)

  config.currentChatId = newChat.chatId

  fs.writeFileSync(appConfigFile, JSON.stringify(config, null, 2))



} catch (err) {
  console.error(err)

  console.log('--- END SEND TELEGRAM MESSAGE ERROR ---')
}
