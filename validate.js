import fs from 'fs';
import path from 'path';

import {
  convertToAbsolutePath,
  getMdFilesInDirectories,
} from './fileUtils.js';

const validateRoute = (route) => {
  if (fs.existsSync(route)) {
    const absolutePath = convertToAbsolutePath(route);
    if (path.extname(absolutePath) === '.md' && !fs.statSync(absolutePath).isDirectory()) {
      return [absolutePath];
    }
    if (fs.statSync(absolutePath).isDirectory()) {
      const mdFiles = getMdFilesInDirectories(absolutePath);
      if (mdFiles.length !== 0) {
        return mdFiles;
      }
    }
  }
  return null;
};

export default validateRoute;
