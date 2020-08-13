import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Schema as MergeOptions} from './schema';

export default function i18nMerge(_options: MergeOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      let i18n: any = {};
      const cwd: string = _options.cwd || './src/app/';
      const pattern: string = _options.pattern || '.i18n.json$';
      const output: string = _options.output || './src/assets/i18n/en.json';
      tree.getDir(cwd)
      .visit((filePath) => {
        if (filePath.search(pattern) === -1) {
          return;
        }
        _context.logger.info(`Reading file : ${filePath}`);
        const buffer: Buffer = tree.read(filePath)!;
        i18n = {
          ...i18n,
          ...JSON.parse(buffer.toString())
        };
      });
      if (tree.exists(output)) {
        tree.overwrite(output, JSON.stringify(i18n));
      } else {
        tree.create(output, JSON.stringify(i18n));
      }
      return tree;
    }
  ]);
}
