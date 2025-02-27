export interface CsrfTokenType {
    secretKey: string;
    refreshKey: string;
    tokenTime: number;
    refreshTokenTime: number;
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