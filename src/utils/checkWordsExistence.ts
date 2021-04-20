import fs from 'fs';

import * as core from '@actions/core';

export interface CheckWordsExistence {
  filePath: string;
  contentValue: string;
  caseSensitive?: boolean;
  errorMessage?: string;
}

export const checkWordsExistence = ({
  filePath,
  contentValue,
  errorMessage,
  caseSensitive = true
}: CheckWordsExistence) => {
  const words = fs.readFileSync(filePath, {
    encoding: 'utf8'
  });

  const wordsChar = caseSensitive ? words : words?.toLowerCase();
  const contentValueChar = caseSensitive
    ? contentValue
    : contentValue?.toLowerCase();

  if (!wordsChar.includes(contentValueChar)) {
    core.setFailed(errorMessage ?? `'${contentValue}' doesn't found`);
  }
};
