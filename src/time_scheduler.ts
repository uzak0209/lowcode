import {runScraping} from './execute'
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Webサーバの設定
app.get('/', (req, res) => {
  res.send('Hello from Web Server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 定期処理（例えば1時間毎）
setInterval(() => {
  console.log('定期処理実行中');
  // ここにスクレイピング処理など書く
}, 1000 * 60 * 60);