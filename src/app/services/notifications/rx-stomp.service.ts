import {Injectable} from '@angular/core';
import {RxStomp, RxStompConfig} from '@stomp/rx-stomp';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
  }
}

const baseUrl = (environment.apiUrl || window.location.origin).split("//")[1];

export const stompConfig: RxStompConfig = {
  brokerURL: `ws://${baseUrl}/ws`,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 5000,
  reconnectDelay: 200
};

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(stompConfig);
  rxStomp.activate();
  return rxStomp;
}
