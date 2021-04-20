import fs from 'fs';

import * as core from '@actions/core';

import { checkWordsExistence } from './utils/checkWordsExistence';
import { getConfigs } from './utils/getConfigs';

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository');
    const configPath: string = core.getInput('configPath');
    const githubToken: string = core.getInput('githubToken');

    const configs = await getConfigs({ repository, configPath, githubToken });

    for (const config of configs) {
      if (fs.existsSync(config?.filePath)) {
        for (const content of config?.contents ?? []) {
          checkWordsExistence({
            filePath: config?.filePath,
            contentValue: content?.value,
            errorMessage: content?.errorMessage,
            caseSensitive: content?.caseSensitive
          });
        }
      } else {
        core.setFailed(`'${config?.filePath}' doesn't exist`);
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
