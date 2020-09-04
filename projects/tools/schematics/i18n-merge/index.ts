import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {FileConfiguration} from '../config';

export default function i18nMerge(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      for (const lang of config.languages) {
        context.logger.info(`Search for '${lang}' files.`);
        const i18n: any = readLanguage(tree, config.cwd, lang);
        saveLanguage(tree, i18n, `${config.output}/${lang}.json`);
        context.logger.info(`Save in '${config.output}/${lang}.json'`);
      }
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

function readLanguage(tree: Tree, cwd: string, lang: string): any {
  let i18n: any = {};
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

function saveLanguage(tree: Tree, i18n: any, output: string): void {
  if (tree.exists(output)) {
    tree.overwrite(output, JSON.stringify(i18n));
  } else {
    tree.create(output, JSON.stringify(i18n));
  }
}
