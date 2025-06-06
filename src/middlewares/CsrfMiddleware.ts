// Express import
import { Response, NextFunction } from "express";

// libraries import
import jwt from "jsonwebtoken";

// utils import
import MessagesUtil from "../utils/MessagesUtil";

// models import
import { CsrfTokenType, SessionTokenInterface } from "../core/models/MiddlewareModel";

import { color } from "../config";


class CsrfMiddleware extends MessagesUtil {

    constructor() {
        super();
    }

    public static getCsrfTokenKeys(): CsrfTokenType {
        return {
            secretKey: this.secretKey,
            refreshKey: this.refreshKey,
            tokenTime: this.tokenTime,
            refreshTokenTime: this.refreshTokenTime
        };
    }




    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    * @returns 
    */
    public authToken(req: any, res: Response, next: NextFunction): void {

        const token = this.extractToken(req);
        console.log(color.bgRed, "Debug Csrf Middleware - authToken : ", token);

        if (!this.isTokenValid(token)) {
            return this.sendErrorResponse(res, 401, "token-missing");
        }


        const secretKey = CsrfMiddleware.secretKey;
        if (!secretKey) {
            return this.sendErrorResponse(res, 500, 'Erreur il manque la clé secrète');
        }


        if (token) {
            this.verifyToken(token, secretKey, req, res, next);
        } else {
            this.sendErrorResponse(res, 401, "invalid-token");
        }
    }






    /**
     * 
     * @param req 
     * @returns 
     */
    private extractToken(req: Request): string | undefined {
        const header: string | undefined = (req.headers as any)['authorization'];

        console.log(color.bgRed, "Debug Csrf Middleware  - extractToken : ", header);

        return header && header.split(' ')[1];
    }



    /**
     * 
     * @param token 
     * @returns 
     */
    private isTokenValid(token: string | undefined): boolean {
        return token !== undefined && token !== 'null' && token !== '';
    }



    /**
     * 
     * @param token 
     * @param secretKey 
     * @param req 
     * @param res 
     * @param next 
     */
    private verifyToken(token: string, secretKey: string, req: any, res: Response, next: NextFunction): void {
        jwt.verify(token, secretKey, (error: jwt.VerifyErrors | null, decoded) => {
            if (error) {
                console.log('Aie')
                const errorMessage = error.name === 'TokenExpiredError' ? "session-expired" : "session-invalid";
                this.sendErrorResponse(res, 401, errorMessage);
                return;
            }
            req.results = decoded;
            next();
        });
    }







    /**
     * 
     */
    private static get secretKey(): string {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Error: Missing secret key');
        }
        return secretKey;
    }



    /**
     * 
     */
    private static get refreshKey(): string {
        const refreshKey = process.env.JWT_REFRESH_SECRET_KEY;
        if (!refreshKey) {
            throw new Error('Error: Missing refresh key');
        }
        return refreshKey;
    }



    /**
     * 
     */
    private static get tokenTime(): number {
        const tokenTime = process.env.JWT_DURATION;
        if (!tokenTime) {
            throw new Error('Error: Missing token duration');
        }
        return parseInt(tokenTime);
    }



    /**
     * 
     */
    private static get refreshTokenTime(): number {
        const refreshTokenTime = process.env.JWT_REFRESH_TOKEN_TIME;
        if (!refreshTokenTime) {
            throw new Error('Error: Missing refresh token duration');
        }
        return parseInt(refreshTokenTime);
    }

    /**
     * 
     * @param payload 
     * @param secretKey 
     * @param expiresIn 
     * @returns 
     */
    public static generateToken(payload: object, secretKey: string, expiresIn: string): string {
        return jwt.sign(payload, secretKey, { expiresIn });
    }


    /**
     * 
     * @param UserInformationsResponse 
     * @returns 
     */
    public static createSessionToken(UserInformationsResponse: SessionTokenInterface): SessionTokenInterface {
        console.log(color.bgBlue + color.blue, `CSRF MIDDLEWARE`, ' -> createSessionToken() called');
        const secretKey = this.secretKey;
        const refreshKey = this.refreshKey;
        const tokenTime = this.tokenTime;
        const refreshTokenTime = this.refreshTokenTime;


        let payload: SessionTokenInterface = {
            user_uuid: UserInformationsResponse.user_uuid,
            user_name: UserInformationsResponse.user_name,
            user_email: UserInformationsResponse.user_email,
            user_nickname: UserInformationsResponse.user_nickname,
            user_avatar: UserInformationsResponse.user_avatar,
            id_role: UserInformationsResponse.id_role
        };

        const token = this.generateToken(payload, secretKey, tokenTime.toString());
        const refreshToken = this.generateToken(payload, refreshKey, refreshTokenTime.toString());

        payload.token = token;
        payload.refreshToken = refreshToken;

        return payload
    }
}

export default CsrfMiddleware;