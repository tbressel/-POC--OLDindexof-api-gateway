export class JsonResponse {
    res: any;
    statusNumber!: number;
    messageKey!: string;
    message!: string;
    state?: boolean;
}



export class NotificationMessages {
    [key: string]: string;
}
