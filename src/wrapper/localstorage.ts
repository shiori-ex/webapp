/** @format */

export default class LocalStorageWrapper {
  public static get<T>(key: string, def?: T): T | undefined {
    const valStr = window.localStorage.getItem(`shiori_${key}`);
    if (!valStr) {
      return def;
    }
    return JSON.parse(valStr) as T;
  }

  public static set<T>(key: string, val: T) {
    const valStr = JSON.stringify(val);
    window.localStorage.setItem(`shiori_${key}`, valStr);
  }
}
