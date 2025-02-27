export interface JsonResponse {
  res: any;
  statusNumber: number;
  messageKey: string;
  message: string;
  state?: boolean;
}

export interface NotificationMessages {
  [key: string]: string;
}

export interface MessageModel {
  code: number;
  messageKey: string | keyof NotificationMessages;
  message: string;
  state: boolean;
  datas?: any;
}

export interface DataMessageModel {
  datas?: any;
}

