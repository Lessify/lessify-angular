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

/**
 * Extract language in one JSON.
 */
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
          if (i18n[key] !== undefined) {
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


/**
 * Extract Key and Path.
 */
export function extractKeyPath(tree: Tree, cwd: string, lang: string): Map<string, string> {
  const keyPath: Map<string, string> = new Map<string, string>();

  tree.getDir(cwd)
  .visit((filePath) => {
    if (filePath.search(`/${lang}.json$`) === -1) {
      return;
    }
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      const read: Dictionary = JSON.parse(buffer.toString());

      for (const key of Object.keys(read)) {
        keyPath.set(key, filePath);
      }
    }
  });
  return keyPath;
}

/**
 * Extract Key and Value.
 */
export function extractKeyValue(tree: Tree, cwd: string, lang: string): Map<string, string> {
  const keyValue: Map<string, string> = new Map<string, string>();
  tree.getDir(cwd)
  .visit((filePath) => {
    if (filePath.search(`/${lang}.json$`) === -1) {
      return;
    }
    const buffer: Buffer | null = tree.read(filePath);
    if (buffer) {
      const read: Dictionary = JSON.parse(buffer.toString());

      for (const key of Object.keys(read)) {
        keyValue.set(key, read[key]);
      }
    }
  });
  return keyValue;
}

/**
 * Update i18n file
 */
export function updateI18nFile(tree: Tree, filePath: string, key: string, value: string) {
  const buffer: Buffer | null = tree.read(filePath);
  if (buffer) {
    const read: Dictionary = JSON.parse(buffer.toString());
    read[key] = value;
    tree.overwrite(filePath, JSON.stringify(read, null, 2));
  }
}

/**
 * Save language Dictionary in file
 */
export function saveLanguage(tree: Tree, i18n: Dictionary, output: string): void {
  if (tree.exists(output)) {
    tree.overwrite(output, JSON.stringify(i18n, null, 2));
  } else {
    tree.create(output, JSON.stringify(i18n, null, 2));
  }
}

export function proxyURIFromEnv(): string | undefined {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    undefined
  );
}
