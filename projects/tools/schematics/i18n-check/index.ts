import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Dictionary, FileConfiguration} from '../models';
import {readConfig, readLanguage} from '../utils';

export default function i18nCheck(): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      const dictionary: Map<string, Dictionary> = new Map<string, Dictionary>();
      for (const lang of config.languages) {
        context.logger.info(`Search for '${lang}' files.`);
        const i18n: Dictionary = readLanguage(tree, config.cwd, lang, true);
        dictionary.set(lang, i18n);
      }

      // Check i18n sizes
      let size = -1;
      let hasDifferentSize = false;
      const diffSizeReport: Map<string, number> = new Map<string, number>();
      for (const lang of config.languages) {
        const i18nLang: Dictionary = dictionary.get(lang) || {};
        if (size === -1) {
          const len = Object.keys(i18nLang)?.length;
          diffSizeReport.set(lang, len);
          size = len;
        } else {
          const len = Object.keys(i18nLang)?.length;
          diffSizeReport.set(lang, len);
          if (size !== len) {
            hasDifferentSize = true;
          }
        }
      }
      context.logger.info(`I18n keys:`);
      diffSizeReport.forEach((value, key) => context.logger.info(`Language ${key} has ${value} keys.`));
      if (hasDifferentSize) {
        context.logger.error(`I18n files contains different number of keys.`);
      }
      return tree;
    }
  ]);
}

