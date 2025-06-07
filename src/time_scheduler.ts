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
  runScraping();
}, 1000 * 60*60*24);