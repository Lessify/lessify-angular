export class SpaceConfig {
  spaceId: string;
  environment: string;
  apiKey: string;
  beta?: boolean;
}

export interface LessifyCoreModuleConfig {
  space: SpaceConfig;
}
