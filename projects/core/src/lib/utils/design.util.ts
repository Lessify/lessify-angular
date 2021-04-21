export class DesignUtil {
  static isInIframe(): boolean {
    return window.location !== window.parent.location;
  }

  static isOriginTrusted(origin: string): boolean {
    switch (origin) {
      case 'https://app.lessify.io':
      case 'https://dev-app.lessify.io':
      case 'http://localhost:4200':
        return true;
      default:
        return false;
    }
  }
}
