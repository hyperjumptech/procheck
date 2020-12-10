# Procheck

A project convention checker by checking file existence and word existence in a file, using a user-defined configuration. This allows users standardize their many projects using a simple, centralized configurations.

# Example Usage

```
- name: @hyperjumptech/procheck
  uses: hyperjumptech/procheck@v1.0.0
  with:
    repository: '{YOUR_USERNAME}/{YOUR_REPOSITORY_NAME}'
    configPath: '{PATH_TO_PROCHECK_JSON}'
    githubToken: ${{ secrets.GITHUB_TOKEN }}
```

Set your secrets here: `https://github.com/USERNAME/REPO/settings/secrets`.

# Configuration Example

You can create a `procheck.json` inside your created repository and use it with this action.

## Check for file existence

This example shows you how to check if README.md and package.json is exists.

```
[
  {
    "filePath": "./README.md",
  },
  {
    "filePath": "./package.json",
  }
]
```

## Check for file existence with word existence

This example shows you how to check if README.md is exists and has "Procheck" and "A project convention checker" text in the file.

```
[
  {
    "filePath": "./README.md",
    "contents": [
      {
        "value": "Procheck"
      },
      {
        "value": "A project convention checker"
      }
    ]
  }
]
```

# Options

- **repository**

  Required: **true**

  Your username and your repository name. e.g `hyperjumptech/procheck-configs`

- **configPath**

  Required: **true**

  Relative configuration path from repository root e.g `procheck-integration-test/procheck.json`

- **githubToken**

  Required: **false**

  Github Personal Access Token to access private repositories
