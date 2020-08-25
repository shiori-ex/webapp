/** @format */

import EventEmitter from './eventemitter';
export enum State {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface SnackBarEvent {
  type: State;
  content: string | JSX.Element;
}

export default class SnackBarNotifier {
  public static eventEmitter = new EventEmitter<SnackBarEvent>();

  public static show(
    content: string | JSX.Element,
    type: State = State.INFO,
    timeout: number = 6000
  ) {
    this.eventEmitter.emit('show', { content, type });
    if (timeout > 0) {
      setTimeout(() => this.hide(), timeout);
    }
  }

  public static hide() {
    this.eventEmitter.emit('hide');
  }
}
