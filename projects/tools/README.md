# Lessify Angular Tools

Angular command line tool to facilitate application development and build.

## Install
``npm i -D @lessify/angular-tools``

## Usage
In root fo your Angular project you can run ``ng generate @lessify/angular-tools:<command>`` or alias ``ng g @lessify/angular-tools:<command>`` where `<commands>` are list of commands enumerated below.
Example : ``ng generate @lessify/angular-tools:i18n-merge`` or alias ``ng g @lessify/angular-tools:i18n-merge``

## Configuration

#### Configuration File

Tool Configuration file should be located in project root with name **lessify.json**.

| Name          	| Description                                   	| Default value |
|-----------------	|--------------------------------------------------	|--------------------------------|
| cwd           	| The current working directory in which to search. |'./src/app'|
| languages       	| Project languages.                                |['en']|
| output         	| Output folder path that will contain all merged value.|'./src/assets/i18n'|

````json
{
    cwd: './src/app',
    output: './src/assets/i18n',
    languages: ['en']
}
````

## Commands

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

| Key               | en        | de            |
|-----------------	|-----------|---------------|
| login.email    	| Email     | Email         |
| login.password    | Password  | Passwort      |
| login.submit      | Submit    | Einreichen    |

### i18n-import-csv

`ng g @lessify/angular-tools:i18n-import-csv`

Import one CSV file into all i18n.

### set-env

`ng g @lessify/angular-tools:set-env`

Read Environment Variables at build time, and store them in a TypeScript file.

| Name              | Description                                   	                | Default value               |
|-------------------|----------------------------------------------------------------|-----------------------------|
| path           	  | Where to save the environment variables                        | './src/environments/env.ts' |
| prefix       	 | Environment variable prefix key, used to keep ony requred one. |                             |

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

Replace **$PATH_TO_SCHEMATIC_PROJECT** with the path to the **@lessify/angular-tools** project’s root.
Note that users will install instead of linking, this is just to iterate faster locally while developing.
Once your schematic project is linked, you can use ng generate to call your schematics:

`ng g @lessify/angular-tools:i18n-merge`
