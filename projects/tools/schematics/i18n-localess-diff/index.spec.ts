import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

describe('Localess Cloud Diff', () => {

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });
  const schematicRunner = new SchematicTestRunner(
      '@schematics/i18n-localess-diff',
      require.resolve('../collection.json'),
  );


  // let appTree: UnitTestTree = new UnitTestTree(new HostTree());

  it('diff', async () => {
    const tree = Tree.empty();
    tree.create('/src/app/i18n/en.json', '{"shared.main.routeDashboard":"Dashboard_OLD","shared.main.routeSettings":"Settings","global.no":"LOCAL_ONLY"}');
    tree.create('/src/app/shared/i18n/en.json', '{"shared.main.routelogout": "Logout_OLD","shared.main.routeSync": "Sync","shared.no": "LOCAL_ONLY"}');

    const resultTree = await schematicRunner.runSchematic('i18n-localess-diff', {
      host: 'local',
      // host: 'https://snr-business-localess-test.web.app',
      space: 'gatqBNAgcGObgKOJvMKm'
    }, tree);
    // Expect no new files
    expect(resultTree.files.length).toBe(2);
  });
});
