export interface CsrfTokenType {
    secretKey: string;
    refreshKey: string;
    tokenTime: number;
    refreshTokenTime: number;
}


export interface SessionTokenInterface {
    user_uuid: string;
    user_name: string;
    user_email: string;
    user_nickname: string;
    user_avatar: string;
    id_role: number;
    user_hashpassword?: string;
    token?: string;
    refreshToken?: string;
}


export class CorsList {
    origin!: string[];
    credentials!: boolean;
    optionsSuccessStatus!: number;
}


export interface RequestLimiterModel {
    windowMs: number;
    max: number;
    handler: (req: any, res: any) => void;
}

export interface SpeedLimiterModel {
    windowMs: number;
    delayAfter: number;
    delayMs: (used: number, req: any) => number;
}