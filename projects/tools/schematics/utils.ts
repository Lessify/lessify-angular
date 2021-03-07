import {Tree} from '@angular-devkit/schematics';
import {defaultConfig, Dictionary, FileConfiguration} from './models';

export function readConfig(tree: Tree): FileConfiguration {
  const file = tree.read('lessify.json');
  let config: FileConfiguration;
  if (file) {
    config = JSON.parse(file.toString());
    return {...defaultConfig, ...config};
  }
  return defaultConfig;
}

export function readLanguage(tree: Tree, cwd: string, lang: string, duplicateCheck: boolean = false): Dictionary {
  let i18n: Dictionary = {};
  tree.getDir(cwd)
  .visit((filePath) => {
    if (filePath.search(`/${lang}.json$`) === -1) {
      return;
    }
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      const read: Dictionary = JSON.parse(buffer.toString());
      if (duplicateCheck) {
        for (const key of Object.keys(read)) {
          if (i18n[key] !== undefined){
            console.warn(`The key [${key}] is used multiple times. One of file is '${filePath}'.`);
          }
        }
      }
      i18n = {
        ...i18n,
        ...read
      };
    }
  });
  return i18n;
}
