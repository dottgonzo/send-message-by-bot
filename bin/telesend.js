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
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lastArgv;
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
            chats: []
        };
        fs_1.default.writeFileSync(appConfigFile, JSON.stringify(config, null, 2));
    }
    if (!config.botId)
        throw new Error('botId not configured');
    if (!config.currentChatId)
        throw new Error('chatId not configured');
    const currentChat = config.chats.find(f => f.chatId === config.currentChatId);
    rl.question('(' + currentChat.label + ') TEXT: ', function (txt) {
        console.log('--- START SEND TELEGRAM MESSAGE ---');
        lastArgv = txt;
        const text = '[' + os_1.default.userInfo().username + '@' + os_1.default.hostname + ']: ' + lastArgv;
        const botId = config.botId;
        const chatId = config.currentChatId;
        console.log('text: ' + text);
        console.log('botId: ' + botId);
        console.log('chatId: ' + chatId);
        __1.default({ text, botId, chatId })
            .then(data => {
            console.log('message sent!');
            console.log('response:', data);
            console.log('--- END SEND TELEGRAM MESSAGE OK ---');
            process.exit(0);
        })
            .catch(err => {
            console.error('error on sending message!!!');
            console.error(err);
            console.log('--- END SEND TELEGRAM MESSAGE ERROR ---');
            process.exit(1);
        });
    });
    rl.on('error', function (err) {
        console.error(err);
        process.exit(1);
    });
    rl.on('close', function () {
        console.log('\nBYE BYE !!!');
        process.exit(2);
    });
}
catch (err) {
    console.error(err);
    console.log('--- END SEND TELEGRAM MESSAGE ERROR ---');
}
//# sourceMappingURL=telesend.js.map