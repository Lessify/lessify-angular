import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

describe('Localess Cloud Sync', () => {

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });
  const schematicRunner = new SchematicTestRunner(
      '@schematics/i18n-localess-sync',
      require.resolve('../collection.json'),
  );


  // let appTree: UnitTestTree = new UnitTestTree(new HostTree());

  it('sync', async () => {
    const tree = Tree.empty();
    tree.create('/src/app/i18n/en.json', '{"shared.main.routeDashboard":"Dashboard_OLD","shared.main.routeSettings":"Settings_OLD","global.no":"LOCAL_ONLY"}');
    tree.create('/src/app/shared/i18n/en.json', '{"shared.main.routelogout": "Logout_OLD","shared.main.routeSync": "Sync_OLD","shared.no": "LOCAL_ONLY"}');

    const resultTree = await schematicRunner.runSchematic('i18n-localess-sync', {
      // host: 'https://snr-business-localess-test.web.app',
      host: 'local',
      space: 'gatqBNAgcGObgKOJvMKm'
    }, tree);
    // Expect no new files
    expect(resultTree.files.length).toBe(2);
    // Expect values to be updated
    expect(resultTree.readContent('/src/app/i18n/en.json'))
    .toBe('{\n  "shared.main.routeDashboard": "Dashboard",\n  "shared.main.routeSettings": "Settings",\n  "global.no": "LOCAL_ONLY"\n}');
    expect(resultTree.readContent('/src/app/shared/i18n/en.json'))
    .toBe('{\n  "shared.main.routelogout": "Logout",\n  "shared.main.routeSync": "Sync",\n  "shared.no": "LOCAL_ONLY"\n}');
  });
});
