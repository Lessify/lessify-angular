import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {FileConfiguration} from '../config';

const SEPARATOR = ',';
const NEW_LINE = '\n';
type Dictionary = { [key: string]: string};
type LanguageDictionary = {[lang: string]: Dictionary};

export default function i18nImportCsv(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);

      context.logger.info(`Construct Key to Path map`);
      const keyToPath: Map<string, string> = createIdToPathMap(tree, context, config.cwd, config.languages[0]);

      const dictionary: Map<string, Dictionary> = new Map<string, Dictionary>();
      let content = `"Key"`;
      for (const lang of config.languages) {
        context.logger.info(`Search for '${lang}' files.`);
        const i18n: any = readLanguage(tree, config.cwd, lang);
        dictionary.set(lang, i18n);
        content += `${SEPARATOR}"${lang}"`;
      }
      content += NEW_LINE;
      const first = dictionary.get(config.languages[0]) || {};
      for (const key of Object.keys(first)) {
        content += `"${key}"`;
        for (const lang of config.languages) {
          let value = '';
          const l = dictionary.get(lang);
          if (l !== undefined && l[key] !== undefined) {
            value = l[key];
          }
          content += `${SEPARATOR}"${value}"`;
        }
        content += NEW_LINE;
      }
      save(tree, content, `${config.output}/languages.csv`);
      context.logger.info(`Save in '${config.output}/languages.csv'`);
      return tree;
    }
  ]);
}

function readConfig(tree: Tree): FileConfiguration {
  const defaultConfig: FileConfiguration = {
    cwd: './src/app',
    output: './src/assets/i18n',
    languages: ['en']
  };
  const file = tree.read('lessify.json');
  let config: FileConfiguration;
  if (file) {
    config = JSON.parse(file.toString());
    return {...defaultConfig, ...config};
  }
  return defaultConfig;
}

function readCSV(tree: Tree, config: FileConfiguration): Map<string, Dictionary> {
  const result: Map<string, Dictionary> = new Map<string, Dictionary>();
  const buffer: Buffer | null = tree.read(`${config.output}/languages.csv`);
  if (buffer) {
    const rows: string[] = buffer.toString().split('\n');
  }
  return result;
}

function readLanguage(tree: Tree, cwd: string, lang: string): Dictionary {
  let i18n: Dictionary = {};
  tree.getDir(cwd)
  .visit((filePath) => {
    if (filePath.search(`/${lang}.json$`) === -1) {
      return;
    }
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      i18n = {
        ...i18n,
        ...JSON.parse(buffer.toString())
      };
    }
  });
  return i18n;
}

function createIdToPathMap(tree: Tree, context: SchematicContext, cwd: string, lang: string): Map<string, string> {
  const keyToPath = new Map<string, string>();
  tree.getDir(cwd)
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

function save(tree: Tree, i18n: string, output: string): void {
  if (tree.exists(output)) {
    tree.overwrite(output, i18n);
  } else {
    tree.create(output, i18n);
  }
}
