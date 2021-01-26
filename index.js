"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
function default_1(opts) {
    return new Promise((resolve, reject) => {
        if (!opts || !opts?.botId || !opts?.chatId || !opts?.text)
            return reject(new Error('all params are required'));
        try {
            https
                .get(`https://api.telegram.org/bot${opts.botId}/sendMessage?chat_id=${opts.chatId}&text=${opts.text}`, resp => {
                let data = '';
                resp.on('data', chunk => {
                    data += chunk;
                });
                resp.on('end', () => {
                    try {
                        const answer = JSON.parse(data);
                        if (!answer.ok)
                            return reject(new Error('wrong answer from telegram'));
                        return resolve({ ok: true });
                    }
                    catch (err) {
                        console.error('malformed answer');
                        return reject(err);
                    }
                });
            })
                .on('error', err => {
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