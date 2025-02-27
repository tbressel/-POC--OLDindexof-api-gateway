// Color importation
import { color } from '../config';
import { RequestLimiterModel, SpeedLimiterModel } from '../core/models/MiddlewareModel';
import MessagesUtil from '../utils/MessagesUtil';


class DdosLimiterMiddleware extends MessagesUtil {

    private static requestCounts = new Map<string, number>();
    private static limitEndTimes = new Map<string, number>();

    public static requestCounterMiddleware(req: any, res: any, next: any): void {
        const ip: string = req.ip;
        const now: number = Date.now();
        const limitEndTime = DdosLimiterMiddleware.limitEndTimes.get(ip) || 0;

        // IF time is passed, reset the counter
        if (now > limitEndTime) {
            DdosLimiterMiddleware.requestCounts.set(ip, 1);
            DdosLimiterMiddleware.limitEndTimes.set(ip, now + DdosLimiterMiddleware.time);
        } else {
            DdosLimiterMiddleware.requestCounts.set(ip, (DdosLimiterMiddleware.requestCounts.get(ip) || 0) + 1);
        }

        const requestCount = DdosLimiterMiddleware.requestCounts.get(ip)!;
        console.log(color.green, `Requête #${requestCount} reçue pour IP : ${color.reset}${ip}`);

        // If the request count is greater than the max requests, apply a delay
        if (requestCount > DdosLimiterMiddleware.maxRequests) {
            const delay = Math.min(
                (requestCount - DdosLimiterMiddleware.maxRequests) * DdosLimiterMiddleware.durationDelay,
                10_000
            );

        
            console.log(color.red, `[Limite atteinte] IP: ${ip}, application d'un délai de ${delay} ms`);
            console.log('Délais restant : ', DdosLimiterMiddleware.limitEndTimes.get(ip)! - now);
            setTimeout(() => {
                console.log(color.green, `Délai terminé, requête traitée pour IP: ${ip}`);
                next();
            }, delay);
        } else {
            next();
        }
    }

    public static getRequestLimiterConfig(): RequestLimiterModel {
        const instance = new DdosLimiterMiddleware();
        return {
            windowMs: this.time,
            max: this.maxRequests,
            handler: (req: any, res: any) => {
                instance.sendErrorResponse(res, 429, 'Too many resquests, re try later.');
            }
        };
    }

    public static getSpeedLimiterConfig(): SpeedLimiterModel {
        return {
            windowMs: this.time,
            delayAfter: this.maxRequests,
            delayMs: (used: number, req: any) => {
                console.log(`Délai appliqué : ${(used - this.maxRequests) * this.durationDelay} ms`);
                return (used - this.maxRequests) * this.durationDelay;
            }
        }
    }



    private static get time(): number {
        const time = process.env.DDOS_WINDOW_MS;
        if (!time) {
            throw new Error('Error: Missing time');
        }
        return parseInt(time);
    }   
    
    private static get maxRequests(): number {
        const maxRequests = process.env.DDOS_MAX_REQUESTS;
        if (!maxRequests) {
            throw new Error('Error: Missing maxRequests');
        }
        return parseInt(maxRequests);
    }
    
    private static get durationDelay(): number {
        const durationDelay = process.env.DDOS_DURATION_DELAY_MS;
        if (!durationDelay) {
            throw new Error('Error: Missing durationDelay');
        }
        return parseInt(durationDelay);
    }

}

export default DdosLimiterMiddleware;
