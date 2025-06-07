import fs from 'fs';
import path from 'path';
import glob from 'glob';

export function deletePngFiles(prefix = '', dir = '.') {
  const glob = require('glob');
  const pattern = path.join(dir, `${prefix}[0-9]*.png`);
  const files = glob.sync(pattern);

  for (const file of files) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted: ${file}`);
    } catch (err) {
      console.error(`Failed to delete ${file}:`, err);
    }
  }
}
