import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Dictionary, FileConfiguration} from '../models';
import {readConfig, readLanguage, saveLanguage} from '../utils';

export default function i18nMerge(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      for (const lang of config.languages) {
        context.logger.info(`Search for '${lang}' files.`);
        const i18n: Dictionary = readLanguage(tree, config.cwd, lang);
        saveLanguage(tree, i18n, `${config.output}/${lang}.json`);
        context.logger.info(`Save in '${config.output}/${lang}.json'`);
      }
      return tree;
    }
  ]);
}
