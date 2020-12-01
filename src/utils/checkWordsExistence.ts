import fs from 'fs';

import * as core from '@actions/core';

export interface CheckWordsExistence {
  filePath: string;
  contentValue: string;
  errorMessage?: string;
}

export const checkWordsExistence = ({
  filePath,
  contentValue,
  errorMessage
}: CheckWordsExistence) => {
  const words = fs.readFileSync(filePath, {
    encoding: 'utf8'
  });

  if (!words.includes(contentValue)) {
    core.setFailed(errorMessage ?? `'${contentValue}' doesn't found`);
  }
};
