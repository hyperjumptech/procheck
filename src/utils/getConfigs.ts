import fetch from 'node-fetch';

import { Config } from '../interfaces/Config';

export interface GetConfig {
  repository: string;
  configPath: string;
  token: string;
}

export const getConfigs = async ({
  repository,
  configPath,
  token
}: GetConfig): Promise<Config[]> => {
  const url = `https://api.github.com/repos/${repository}/contents/${configPath}`;
  const hasToken = token !== '' && {
    Authorization: `token ${token}`
  };

  const res = await fetch(url, {
    headers: {
      ...hasToken,
      Accept: 'application/vnd.github.v3.raw'
    }
  });

  const json = await res.json();

  return json;
};
