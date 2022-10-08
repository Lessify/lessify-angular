import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Dictionary, FileConfiguration} from '../models';
import {readConfig, saveLanguage} from '../utils';

export default function i18nImportCsv(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);

      context.logger.info(`Construct Key to Path map`);
      const keyToPath: Map<string, string> = createIdToPathMap(tree, context, config);
      const langKeyValue: Map<string, Map<string, string>> = readCSV(tree, context, config);

      langKeyValue.forEach((langValue, langKey) => {
            langValue.forEach((value, key) => {
              const path = keyToPath.get(key);
              if (path) {
                const dic: Dictionary = readLanguage(tree, path, langKey);
                dic[key] = value;
                saveLanguage(tree, dic, `${path}/${langKey}.json`);
              }
            });
          }
      );
      return tree;
    }
  ]);
}

function readCSV(tree: Tree, context: SchematicContext, config: FileConfiguration): Map<string, Map<string, string>> {
  const result: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
  const buffer: Buffer | null = tree.read(`${config.output}/languages.csv`);
  if (buffer) {
    const languages: string[] = [];
    const rows: string[] = buffer.toString().split(/\r?\n/);
    rows.forEach((row, rowIndex) => {
          // Header read
          if (rowIndex === 0) {
            const columns: string[] = row.split('","');
            columns.forEach((column, columnIndex) => {
                  if (columnIndex > 0) {
                    const lang = removeQuote(column);
                    languages.push(lang);
                    result.set(lang, new Map<string, string>());
                  }
                }
            );
          } else {
            const columns: string[] = row.split('","');
            let i18nKey = '';
            columns.forEach((column, columnIndex) => {
                  if (columnIndex === 0) {
                    i18nKey = removeQuote(column);
                  } else {
                    const lang = languages[columnIndex - 1];
                    const langMap = result.get(lang);
                    if (langMap) {
                      if (langMap.has(i18nKey)) {
                        context.logger.warn(`The Key '${i18nKey}' is declared more then one time in the csv file.`);
                      }
                      langMap.set(i18nKey, removeQuote(column));
                    }
                  }
                }
            );
          }
        }
    );
  }
  return result;
}

function readLanguage(tree: Tree, cwd: string, lang: string): Dictionary {
  let i18n: Dictionary = {};
  const filePath = `${cwd}/${lang}.json`;
  if (tree.exists(filePath)) {
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      i18n = JSON.parse(buffer.toString());
    }
  }
  return i18n;
}

function createIdToPathMap(tree: Tree, context: SchematicContext, config: FileConfiguration): Map<string, string> {
  const keyToPath = new Map<string, string>();
  const lang = config.languages[0];
  tree.getDir(config.cwd)
  .visit((filePath) => {
    if (filePath.search(`/${lang}.json$`) === -1) {
      return;
    }
    const dirPath: string = filePath.substr(0, filePath.length - lang.length - 5);
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      const i18n: Dictionary = JSON.parse(buffer.toString());
      for (const i18nKey in i18n) {
        if (keyToPath.has(i18nKey)) {
          context.logger.warn(`The Key '${i18nKey}' is declared more then one time. Paths : '${keyToPath.get(i18nKey)}' and '${dirPath}'.`);
        } else {
          keyToPath.set(i18nKey, dirPath);
        }
      }
    }
  });
  return keyToPath;
}

function removeQuote(text: string): string {
  let result = text;
  if (result.charAt(0) === '"') {
    result = result.substring(1);
  }
  if (result.charAt(result.length - 1) === '"') {
    result = result.slice(0, -1);
  }
  return result;
}
