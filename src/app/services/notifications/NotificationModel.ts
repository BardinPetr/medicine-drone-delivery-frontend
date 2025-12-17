export interface INotificationKey {
  className: string;
  eventType: NotificationType;
}

export enum NotificationType {
  INSERT = "INSERT", UPDATE = "UPDATE", DELETE = "DELETE", REFRESH = "REFRESH",
}

export interface INotification {
  eventKey: INotificationKey;
  objects: number[]
}

export interface IObjectChange {
  type: NotificationType;
  objects: number[]
}
