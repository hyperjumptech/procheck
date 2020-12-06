import fetch from 'node-fetch';
import * as core from '@actions/core';
import { Config } from './../interfaces/Config';

export interface GetConfig {
  repository: string;
  configPath: string;
  githubToken: string;
}

export const getConfigs = async ({
  repository,
  configPath,
  githubToken
}: GetConfig): Promise<Config[]> => {
  const url = `https://api.github.com/repos/${repository}/contents/${configPath}`;
  const withToken = githubToken && {
    Authorization: `token ${githubToken}`
  };

  const res = await fetch(url, {
    headers: {
      ...withToken,
      Accept: 'application/vnd.github.v3.raw'
    }
  });

  const json = await res.json();
  core.info(`Output: \n${JSON.stringify(json)}`);

  return json;
};
