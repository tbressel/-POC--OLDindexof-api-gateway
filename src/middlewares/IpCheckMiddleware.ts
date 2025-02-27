import { Request, Response, NextFunction } from "express";
import MessagesUtil from "../utils/MessagesUtil";

class IpCheckMiddleware extends MessagesUtil {

  private static allowedIPs = ["127.0.0.1"];

  constructor() {
    super();
    this.ipCheck = this.ipCheck.bind(this);
    this.sendErrorResponse = this.sendErrorResponse.bind(this);
  }

  /**
   * Middleware to check if the client's IP address is allowed.
   * 
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  public ipCheck(req: Request, res: Response, next: NextFunction): void {
    let clientIP = req.socket.remoteAddress;
    if (!clientIP) {
      this.sendErrorResponse(res, 400, "Ouste saleté de pirate !");
      return;
    }

    // Extract IPv4 from IPv6 mapped address
    if (clientIP.startsWith("::ffff:")) {
      clientIP = clientIP.split("::ffff:")[1];
    }

    if (!IpCheckMiddleware.allowedIPs.includes(clientIP.trim())) {
      this.sendErrorResponse(res, 403, "Accès interdit");
      return;
    }
    next();
  }
}

export default new IpCheckMiddleware();;