export interface DesignEvent {
  action: DesignAction;
  type: DesignModelType;
  id: string;
}

export enum DesignAction {
  LINK = 'link'
}

export enum DesignModelType {
  TRANSLATION = 'translation',
  CONFIGURATION = 'configuration'
}
