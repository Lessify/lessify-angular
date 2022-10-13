# Lessify Angular Tools

![npm](https://img.shields.io/npm/dw/@lessify/angular-tools)
![npm](https://img.shields.io/npm/dm/@lessify/angular-tools)
![npm](https://img.shields.io/npm/dy/@lessify/angular-tools)
![npm](https://img.shields.io/npm/dt/@lessify/angular-tools)

Angular command line tool to facilitate application development and build.

## Install

``npm i -D @lessify/angular-tools``

## Usage

In root fo your Angular project you can run ``ng generate @lessify/angular-tools:<command>`` or
alias ``ng g @lessify/angular-tools:<command>`` where ``<commands>`` are list of commands enumerated below.
Example : ``ng generate @lessify/angular-tools:i18n-merge`` or alias ``ng g @lessify/angular-tools:i18n-merge``

## Configuration

### Configuration File

Tool Configuration file should be located in project root with name **lessify.json**.

Where we have two sections :
- Local - all configuration related to local project

| Name               | Description                                            | Default value       |
|--------------------|--------------------------------------------------------|---------------------|
| **Local**          |                                                        |                     |
| cwd                | The current working directory in which to search.      | "./src/app"         |
| languages          | Project languages.                                     | ["en"]              |
| output             | Output folder path that will contain all merged value. | "./src/assets/i18n" |

````json
{
  "cwd": "./src/app",
  "output": "./src/assets/i18n",
  "languages": ["en"]
}
````

## i18n Local Commands

### i18n-check

`ng g @lessify/angular-tools:i18n-check`

Check i18n integrity.

- duplicated keys
- number of keys in each language.

### i18n-merge

`ng g @lessify/angular-tools:i18n-merge`

Merge i18n JSON files in one.
For example you have three languages, then you will have three files as output (one per language).

### i18n-export-csv

`ng g @lessify/angular-tools:i18n-export-csv`

Export all translations in one CSV file.

| Key            | en       | de         |
|----------------|----------|------------|
| login.email    | Email    | Email      |
| login.password | Password | Passwort   |
| login.submit   | Submit   | Einreichen |

### i18n-import-csv

`ng g @lessify/angular-tools:i18n-import-csv`

Import one CSV file into all i18n.

## Localess Cloud Commands

Proxy will be automatically filled from NPM configurations.

### i18n-localess-diff

`ng g @lessify/angular-tools:i18n-localess-diff`

It will compare values from **Localess** cloud and your local project.

Cloud fields host and space are mandatory.

| Parameter | Alias | Description                                 |
|-----------|-------|---------------------------------------------|
| host      | h     | Firebase host where API is deployed.        |
| space     | s     | Space ID, you can find it in Spaces section |

### i18n-localess-sync

`ng g @lessify/angular-tools:i18n-localess-sync`

It will copy values from **Localess** cloud and will update them in your local project.

Cloud fields host and space are mandatory.

| Parameter | Alias | Description                                 |
|-----------|-------|---------------------------------------------|
| host      | h     | Firebase host where API is deployed.        |
| space     | s     | Space ID, you can find it in Spaces section |


## Environment Commands

### set-env

`ng g @lessify/angular-tools:set-env`

Read Environment Variables at build time, and store them in a TypeScript file.

| Name   | Description                                                    | Default value               |
|--------|----------------------------------------------------------------|-----------------------------|
| path   | Where to save the environment variables                        | "./src/environments/env.ts" |
| prefix | Environment variable prefix key, used to keep ony requred one. |                             |

Example of output file

````typescript
export const env = {
  "LESS_ENV": "dev",
  "LESS_NAME": "LESSIFY"
};
````

## Testing

In your project, link the @lessify/angular-tools we just built:

``npm link $PATH_TO_SCHEMATIC_PROJECT``

Replace **$PATH_TO_SCHEMATIC_PROJECT** with the path to the **@lessify/angular-tools** project’s
root.
Note that users will install instead of linking, this is just to iterate faster locally while
developing.
Once your schematic project is linked, you can use ng generate to call your schematics:

`ng g @lessify/angular-tools:i18n-merge`
