/** @format */

export type EventHandler<T> = (v?: T) => void;
export type EventRemover = () => void;

export default class EventEmitter<T> {
  private handlers: { [key: string]: EventHandler<T>[] } = {};

  public on(event: string, handler: EventHandler<T>): EventRemover {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(handler);

    return () => {
      const i = this.handlers[event].indexOf(handler);
      if (i >= 0) {
        this.handlers[event].splice(i, 1);
      }
    };
  }

  public emit(event: string, v?: T) {
    this.handlers[event]?.forEach((f) => f(v));
  }
}
