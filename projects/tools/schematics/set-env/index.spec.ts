import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

describe('Set Environments', () => {

  const schematicRunner = new SchematicTestRunner(
      '@schematics/set-env',
      require.resolve('../collection.json'),
  );

  // let appTree: UnitTestTree = new UnitTestTree(new HostTree());

  it('logs', () => {
    schematicRunner.runSchematicAsync('set-env', {prefix: 'USERNAME'}, Tree.empty())
    .subscribe({
      next: tree => {
        expect(tree.exists('./src/environments/env.ts')).toBe(true);
        console.log(tree.readContent('./src/environments/env.ts'));
      }
    });
  });
});
