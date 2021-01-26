"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
console.log(process.argv);
console.log('--- START SEND TELEGRAM MESSAGE ---');
const lastArgv = process.argv.filter(f => !f.includes('/'));
const text = lastArgv[0];
const botId = lastArgv[1];
const chatId = Number(lastArgv[2]);
console.log('text: ' + text);
console.log('botId: ' + botId);
console.log('chatId: ' + chatId);
_1.default({ text, botId, chatId })
    .then(data => {
    console.log('message sent');
    console.log(data);
    console.log('--- END SEND TELEGRAM MESSAGE ---');
})
    .catch(err => {
    console.error(err);
});
//# sourceMappingURL=run.js.map