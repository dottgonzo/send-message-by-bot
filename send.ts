import sendTelegramMessage from '.'

// console.log(process.argv)

console.log('--- START SEND TELEGRAM MESSAGE ---')

try {
  const text = process.argv[2]
  const botId = process.argv[3]
  const chatId = Number(process.argv[4])

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
