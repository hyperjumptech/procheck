import fs from 'fs';

import * as core from '@actions/core';

import { checkWordsExistence } from './utils/checkWordsExistence';
import { getConfigs } from './utils/getConfigs';

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository');
    const configPath: string = core.getInput('configPath');

    const configs = await getConfigs({ repository, configPath });

    for (const config of configs) {
      if (fs.existsSync(config?.filePath)) {
        // Check if config contents is exists, an array, and has minimal 1 array items
        if (
          config?.contents &&
          Array.isArray(config?.contents) &&
          config?.contents.length > 0
        ) {
          // Check word existence
          for (const content of config?.contents) {
            checkWordsExistence({
              filePath: config?.filePath,
              contentValue: content?.value,
              errorMessage: content?.errorMessage
            });
          }
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
