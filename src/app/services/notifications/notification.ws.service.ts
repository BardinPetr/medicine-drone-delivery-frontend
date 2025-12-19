import {Injectable} from '@angular/core';
import {RxStompService} from './rx-stomp.service';
import {IMessage} from "@stomp/stompjs";
import {filter, map, Observable} from "rxjs";
import {INotification, IObjectChange, NotificationType} from "@/services/notifications/NotificationModel";

const BASE_TOPIC = "/app"

const defaultNotifyTypes = [NotificationType.INSERT, NotificationType.UPDATE, NotificationType.DELETE]

@Injectable({
  providedIn: 'root'
})
export class NotificationWsService {

  constructor(private rxStomp: RxStompService) {
  }

  watch(
    classname: string,
    types: NotificationType[] = defaultNotifyTypes
  ): Observable<IObjectChange> {
    return this.rxStomp.watch(`${BASE_TOPIC}/${classname}`)
      .pipe(map((msg: IMessage) => JSON.parse(msg.body) as INotification))
      .pipe(filter(msg => types.includes(msg.eventKey.eventType)))
      .pipe(map(msg => ({
        type: msg.eventKey.eventType,
        objects: msg.objects
      } as IObjectChange)))
  }
}
