import sendTelegramMessage from '.'

console.log(process.argv)

console.log('--- START SEND TELEGRAM MESSAGE ---')

const lastArgv = process.argv.filter(f => !f.includes('/'))
const text = lastArgv[0]
const botId = lastArgv[1]
const chatId = Number(lastArgv[2])

console.log('text: ' + text)
console.log('botId: ' + botId)
console.log('chatId: ' + chatId)

sendTelegramMessage({ text, botId, chatId })
  .then(data => {
    console.log('message sent')
    console.log(data)
    
    console.log('--- END SEND TELEGRAM MESSAGE ---')
  })
  .catch(err => {
      console.error(err)
  })
