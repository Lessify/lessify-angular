import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

describe('Set Environments', () => {

  const schematicRunner = new SchematicTestRunner(
    '@schematics/set-env',
    require.resolve('../collection.json'),
  );

  // let appTree: UnitTestTree = new UnitTestTree(new HostTree());

  it('update environments', async () => {
    const tree = await schematicRunner.runSchematic('set-env', {prefix: 'USERNAME'}, Tree.empty());
    expect(tree.exists('./src/environments/env.ts')).toBe(true);
    // console.log(tree.readContent('./src/environments/env.ts'));
  });
});
