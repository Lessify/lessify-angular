export class DesignUtil {
  static isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
