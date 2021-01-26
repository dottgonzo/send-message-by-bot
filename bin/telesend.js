#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const __1 = __importDefault(require(".."));
// console.log(process.argv)
console.log('--- START SEND TELEGRAM MESSAGE ---');
try {
    const appConfigFile = path_1.default.join(os_1.default.homedir(), '.telegrammessagebot');
    let config;
    try {
        config = JSON.parse(fs_1.default.readFileSync(appConfigFile, 'utf-8'));
    }
    catch (err) {
        config = {
            currentChatId: 0,
            botId: '',
            chats: [],
            username: ''
        };
        fs_1.default.writeFileSync(appConfigFile, JSON.stringify(config, null, 2));
    }
    if (!config.botId)
        throw new Error('botId not configured');
    if (!config.currentChatId)
        throw new Error('chatId not configured');
    if (!config.username)
        throw new Error('username not configured');
    const lastArgv = process.argv.filter(f => !f.includes('/'));
    const text = '[' + config.username + ']: ' + lastArgv[lastArgv.length - 1];
    const botId = config.botId;
    const chatId = config.currentChatId;
    console.log('text: ' + text);
    console.log('botId: ' + botId);
    console.log('chatId: ' + chatId);
    console.log('---- sending message...');
    __1.default({ text, botId, chatId })
        .then(data => {
        console.log('message sent!');
        console.log('response:', data);
        console.log('--- END SEND TELEGRAM MESSAGE OK ---');
    })
        .catch(err => {
        console.error('error on sending message!!!');
        console.error(err);
        console.log('--- END SEND TELEGRAM MESSAGE ERROR ---');
    });
}
catch (err) {
    console.error(err);
    console.log('--- END SEND TELEGRAM MESSAGE ERROR ---');
}
//# sourceMappingURL=telesend.js.map