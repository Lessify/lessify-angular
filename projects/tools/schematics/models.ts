export interface FileConfiguration {
  cwd: string;
  output: string;
  languages: string[];
}

export const defaultConfig: FileConfiguration = {
  cwd: './src/app',
  output: './src/assets/i18n',
  languages: ['en']
};

export type Dictionary = { [key: string]: string };
