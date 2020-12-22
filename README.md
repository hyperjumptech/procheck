# Procheck

A project convention checker

# What it Does

This action checks for file existence and word existence in a file, using a user-defined configuration. This allows users standardize their many projects using a simple, centralized configurations.

# Example Usage

```
- name: @hyperjumptech/procheck
  uses: hyperjumptech/procheck@v1.0.0
  with:
    repository: '{YOUR_USERNAME}/{YOUR_REPOSITORY_NAME}'
    configPath: '{PATH_TO_PROCHECK_JSON}'
    githubToken: ${{ secrets.GITHUB_TOKEN }}
```

**NOTE**: You only need Github Token if you're accessing your configurations from private repositories. Set your Github Token here: `https://github.com/settings/tokens`

Set your secrets here: `https://github.com/USERNAME/REPO/settings/secrets`.

# Configuration Example

You can create a `procheck.json` inside your created repository and use it with this action.

## Available Properties

| Properties | Type     | Required | Description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| filePath   | `string` | **true** | Configuration file path                             |
| contents   | `Array`  | false    | Array of objects of texts that needs to be included |

In `contents` array object, you only need a `value` key to describe what text should be included in a file.

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

| Options     | Required | Description                                                                                                  |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| repository  | true     | Your username and your repository name where the configuration resides. e.g `hyperjumptech/procheck-configs` |
| configPath  | true     | Relative configuration path from repository root e.g `procheck-integration-test/procheck.json`               |
| githubToken | false    | Github Token to access private repositories                                                                  |
