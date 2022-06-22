import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';

export default function setEnv(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const env: { [key: string]: string } = {};

    Object.getOwnPropertyNames(process.env)
    .filter(value => value.startsWith(options.prefix || ''))
    .forEach((value) => {
      env[value] = process.env[value]!;
    });

    const content = `export const env = ${JSON.stringify(env, null, 2)};`;

    context.logger.info(content);

    if (tree.exists(options.path)) {
      tree.overwrite(options.path, content);
    } else {
      tree.create(options.path, content);
    }
    return tree;
  };
}
