import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';
import axios from 'axios';
import {Dictionary, FileConfiguration} from '../models';
import {extractKeyPath, extractKeyValue, readConfig, readLanguage, updateI18nFile} from '../utils';
import {readFileSync} from 'fs';

const CURRENT_FOLDER = 'projects/tools/schematics/i18n-localess-sync';

export default function i18nLocalessSync(options: Schema): Rule {
  return chain([
    // Download locales in a temporary folder
    async (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      for (const lang of config.languages) {
        const hostUrl = `${options.host}/api/v1/spaces/${options.space}/translations/${lang}.json`;
        context.logger.info(`Downloading : ${hostUrl}`);
        let content: string | Buffer;
        // handle local tests
        if (options.host === 'local') {
          content = readFileSync(`${CURRENT_FOLDER}/${lang}.json`);
        } else {
          const res = await axios.get<Dictionary>(hostUrl);
          content = JSON.stringify(res.data);
        }
        tree.create(`${config.output}/tmp/${lang}.json`, content);
      }
    },
    // Work
    (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      for (const lang of config.languages) {
        context.logger.info(`Collecting local data for '${lang}'...`);
        const langDic = readLanguage(tree, `${config.output}/tmp`, lang);
        const langKeyValue = extractKeyValue(tree, config.cwd, lang);
        const langKeyPath = extractKeyPath(tree, config.cwd, lang);
        context.logger.info(`Remote Language '${lang}' has ${Object.getOwnPropertyNames(langDic).length} keys`);
        // console.log(`Remote Language '${lang}' has ${Object.getOwnPropertyNames(langDic).length} keys`);
        context.logger.info(`Updating local files for '${lang}'...`);
        for (const langKey of Object.getOwnPropertyNames(langDic)) {
          const value = langDic[langKey];
          // console.log(`Language ${lang} '${langKey}'='${value}' => ${langKeyValue.has(langKey)}`);
          if (langKeyValue.has(langKey) && langKeyValue.get(langKey) !== value) {
            const path = langKeyPath.get(langKey);
            context.logger.debug(`Local update '${lang}' with key = '${langKey}' value = '${langDic[langKey]}' in file ${path}`);
            // console.log(`Local update '${lang}' with key = '${langKey}' value = '${langDic[langKey]}' in file ${path}`);
            if (path) {
              updateI18nFile(tree, path, langKey, value);
            }
          }
        }
      }


    },
    // Clean up temporary folder
    (tree: Tree, context: SchematicContext) => {
      // console.log(`Cleanup temporary files ...`);
      context.logger.info(`Cleanup temporary files ...`);
      const config: FileConfiguration = readConfig(tree);
      for (const lang of config.languages) {
        const path = `${config.output}/tmp/${lang}.json`;
        if (tree.exists(path)) {
          context.logger.info(`Delete : ${path}`);
          tree.delete(path);
        }
      }
    }
  ]);
}


