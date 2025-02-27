export interface CsrfTokenType {
    secretKey: string;
    refreshKey: string;
    tokenTime: number;
    refreshTokenTime: number;
}