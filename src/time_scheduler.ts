import {runScraping} from './execute'
setInterval(() => {
  runScraping();
}, 1000 * 60 * 60); // 1時間ごと