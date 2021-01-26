#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
// console.log(process.argv)
try {
    const lastArgv = process.argv.filter(f => !f.includes('/'));
    const newChatLabel = lastArgv[lastArgv.length - 1];
    console.log('--- SWITCH TELEGRAM CHAT TO ' + newChatLabel + ' ---');
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
    const chatId = config.currentChatId;
    const newChat = config.chats.find(f => f.label.replace(/ /g, '') === newChatLabel.replace(/ /g, ''));
    if (!newChat)
        throw new Error('chatId not found on chat list');
    console.log('old chatId: ' + chatId);
    console.log('new chatId: ' + newChat.chatId);
    config.currentChatId = newChat.chatId;
    fs_1.default.writeFileSync(appConfigFile, JSON.stringify(config, null, 2));
}
catch (err) {
    console.error(err);
    console.log('--- END SEND TELEGRAM MESSAGE ERROR ---');
}
//# sourceMappingURL=switchChat.js.map