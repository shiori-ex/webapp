/** @format */

import { Client } from 'shiorijs';
import LocalStorageWrapper from '../wrapper/localstorage';
import Consts from './consts';
import EventEmitter, { EventHandler, EventRemover } from './eventemitter';

export default class GlobalState {
  private _client?: Client;
  private eventEmitter = new EventEmitter();

  public get client(): Client {
    if (!this._client) {
      const token = LocalStorageWrapper.get<string>('token');
      if (token) {
        this._client = new Client(token, Consts.API_ENDPOINT);
      } else {
        this.eventEmitter.emit('error');
      }
    }

    return this._client!;
  }

  public onError(handler: EventHandler<any>): EventRemover {
    return this.eventEmitter.on('error', handler);
  }
}
