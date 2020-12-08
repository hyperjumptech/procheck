import fs from 'fs';

import * as core from '@actions/core';

import { checkWordsExistence } from './utils/checkWordsExistence';
import { getConfigs } from './utils/getConfigs';

async function run(): Promise<void> {
  try {
    // Get input from action
    const repository: string = core.getInput('repository');
    const configPath: string = core.getInput('configPath');
    const githubToken: string = core.getInput('githubToken');
    // Get config from repository
    const configs = await getConfigs({ repository, configPath, githubToken });

    // Check if configs is an array and it has minimum length 1 item
    if (Array.isArray(configs) && configs.length > 0) {
      for (const config of configs) {
        // Check if file exists
        if (fs.existsSync(config?.filePath)) {
          // Check if user wants to only ensure file existence or with words existence
          if (config?.contents) {
            // Check if config.contents is an array and it has minimum length 1 item
            if (
              Array.isArray(config?.contents) &&
              config?.contents.length > 0
            ) {
              // Search for words existence
              for (const content of config?.contents) {
                checkWordsExistence({
                  filePath: config?.filePath,
                  contentValue: content?.value,
                  errorMessage: content?.errorMessage
                });
              }
            } else {
              // Throw an error if config contents is not an array and does not have minimal 1 item
              throw Error(
                'Config contents must be an array and has minimal 1 item!'
              );
            }
          }
        } else {
          // Throw an error if the file does not exists.
          throw Error(`'${config?.filePath}' doesn't exist`);
        }
      }
    } else {
      // Throw an error if configs is not an array and does not have minimal 1 item
      throw Error('Configs must be an array and has minimal 1 item!');
    }
  } catch (error) {
    // Set workload to fail with the error message
    core.setFailed(error.message);
  }
}

run();
