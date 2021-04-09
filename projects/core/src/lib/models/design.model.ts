export interface DesignEvent {
  action: DesignAction;
  type: DesignModelType;
  id: string;
  locale?: string;
  value?: string;
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
