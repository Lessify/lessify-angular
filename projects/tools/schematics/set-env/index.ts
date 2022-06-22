import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';

export default function setEnv(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    console.log('options : ' + JSON.stringify(options));
    console.log('process.env : ' + JSON.stringify(process.env));
    context.logger.info('options : ' + JSON.stringify(options));

    const env: { [key: string]: string } = {};

    Object.getOwnPropertyNames(process.env)
    .filter(value => value.startsWith(options.prefix || ''))
    .forEach((value) => {
      env[value] = process.env[value]!;
    });

    console.log('env : ' + JSON.stringify(env));

    const content = `export const env = ${JSON.stringify(env, null, 2)};`;

    console.log('content : ' + content);
    if (tree.exists(options.path)) {
      tree.overwrite(options.path, content);
    } else {
      tree.create(options.path, content);
    }

    return tree;
  };
}
