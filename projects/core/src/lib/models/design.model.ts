export interface DesignEvent {
  action: DesignAction;
  type: DesignModelType;
  space: string;
  environment: string;
  id: string;
  locale?: string;
  value?: string | number | boolean;
}

export enum DesignAction {
  LINK = 'link',
  RELOAD = 'reload',
  UPDATE = 'update'
}

export enum DesignModelType {
  TRANSLATION = 'translation',
  CONFIGURATION = 'configuration'
}
