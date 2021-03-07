import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Dictionary, FileConfiguration} from '../models';
import {readConfig, readLanguage} from '../utils';

const SEPARATOR = ',';
const NEW_LINE = '\n';

export default function i18nExportCsv(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      const dictionary: Map<string, Dictionary> = new Map<string, Dictionary>();
      let content = `"Key"`;
      for (const lang of config.languages) {
        context.logger.info(`Search for '${lang}' files.`);
        const i18n: Dictionary = readLanguage(tree, config.cwd, lang);
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

function save(tree: Tree, i18n: string, output: string): void {
  if (tree.exists(output)) {
    tree.overwrite(output, i18n);
  } else {
    tree.create(output, i18n);
  }
}
