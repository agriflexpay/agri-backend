import { NextFunction, Response, Request } from "express";
import { get } from "lodash";
import { verifyToken } from "../utils/jwt.utls";
import TokenService from "../services/token";
export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken: any = get(req, "headers.x-access-token"); //.replace(/^Bearer\s/, "");
    const refreshToken: any = get(req, "headers.x-refresh");

    
    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = await verifyToken(accessToken);
    
    if (decoded) {
        res.locals.user = decoded?.data;
        return next();
    }

    if (expired && refreshToken) {
        const new_access_token = await TokenService.reIssueAccessToken({ refreshToken });

        if (new_access_token && Object.keys(new_access_token ?? {})?.length) {
            res.setHeader("x-access-token", new_access_token?.authToken);
            res.setHeader("headers.x-refresh", new_access_token?.refreshToken);

            const result = await verifyToken(new_access_token?.authToken);

            res.locals.user = (await result).decoded;
        }

        return next();

    }

    return next();
}