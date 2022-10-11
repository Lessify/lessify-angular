import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';
import axios from 'axios';
import {Dictionary, FileConfiguration} from '../models';
import {extractKeyValue, readConfig} from '../utils';
import {readFileSync} from 'fs';

interface DictionaryDifference {
  key: string;
  local?: string;
  cloud?: string;
}

const CURRENT_FOLDER = 'projects/tools/schematics/i18n-localess-diff';

export default function i18nLocalessDiff(options: Schema): Rule {
  return chain([
    // Download locales in a temporary folder
    async (tree: Tree, context: SchematicContext) => {
      const config: FileConfiguration = readConfig(tree);
      // context.logger.info(`Config = ${JSON.stringify(config)}`);
      context.logger.info(`Languages : ${config.languages.join(', ')}`);
      for (const lang of config.languages) {
        const hostUrl = `${options.host}/api/v1/spaces/${options.space}/translations/${lang}.json`;
        context.logger.info(`Downloading : ${hostUrl}`);
        let content: string | Buffer;
        // handle local tests
        if (options.host === 'local') {
          content = readFileSync(`${CURRENT_FOLDER}/${lang}.json`);
        } else {
          // const httpProxy = process.env.npm_config_proxy;
          // const httpsProxy = process.env.npm_config_https_proxy;
          //
          // console.log(proxy(httpProxy || ''));
          // console.log(proxy(httpsProxy || ''));

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
        context.logger.info(`Collecting data for '${lang}'...`);
        const local = extractKeyValue(tree, config.cwd, lang);
        const remote = extractKeyValue(tree, `${config.output}/tmp`, lang);

        const allKeys = new Set([...remote.keys(), ...local.keys()]);
        const diff: DictionaryDifference[] = [];
        allKeys.forEach(key => {
          const localValue = local.get(key);
          const cloudValue = remote.get(key);
          if (localValue && cloudValue) {
            if (localValue !== cloudValue) {
              diff.push({
                key,
                local: localValue,
                cloud: cloudValue
              });
            }
          } else {
            diff.push({
              key,
              local: localValue,
              cloud: cloudValue
            });
          }
        });
        context.logger.info(`Language '${lang}' differences :`);
        // console.log(`Language '${lang}' differences :`);
        console.table(diff);
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
          tree.delete(path);
        }
      }
    }
  ]);
}


