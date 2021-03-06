"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
function default_1(opts) {
    return new Promise((resolve, reject) => {
        if (!opts || !(opts === null || opts === void 0 ? void 0 : opts.botId) || !(opts === null || opts === void 0 ? void 0 : opts.chatId) || !(opts === null || opts === void 0 ? void 0 : opts.text))
            return reject(new Error('all params are required'));
        try {
            https
                .get(`https://api.telegram.org/bot${opts.botId}/sendMessage?chat_id=${opts.chatId}&text=${opts.text}`, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    try {
                        const answer = JSON.parse(data);
                        if (!answer.ok)
                            return reject(new Error('wrong answer from telegram'));
                        return resolve(answer);
                    }
                    catch (err) {
                        console.error('malformed answer', data);
                        return reject(err);
                    }
                });
            })
                .on('error', (err) => {
                console.log('Error: ' + err.message);
                return reject(err);
            });
        }
        catch (err) {
            console.error(err);
            return reject(err);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map