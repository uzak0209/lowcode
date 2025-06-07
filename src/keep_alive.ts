import https from 'https';

const URL = 'https://lowcode.onrender.com/'; // ここを目的のURLに変更してください

export function sendRequest() {
    https.get(URL, (res) => {
        console.log(`[${new Date().toISOString()}] GET ${URL} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`[${new Date().toISOString()}] Error:`, err.message);
    });
}
