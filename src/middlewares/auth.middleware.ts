import jwt from 'jsonwebtoken';
import { singleton } from "tsyringe";
import { Request, Response, NextFunction } from 'express';
import { env, publicRoute } from "@dependency";

@singleton()
export class AuthMiddleware {
    constructor() {

    }

    use(req: Request, res: Response, next: NextFunction) {
        const { headers, method } = req;

        const route = req.originalUrl || req.url || '';

        if (publicRoute.isPublicRoute(route, method)) return next();

        const { authorization: jwtToken } = headers;

        const apiKey = headers['cnx-api-key'];

        if (!jwtToken && !apiKey)
            return res.status(401).json({ message: 'Acesso não autorizado.' });

        if (apiKey) return this.authByApiKey(apiKey, res, next);

        return this.authByJWTToken(jwtToken, req, next);
    }

    private authByApiKey = (key: any, res: any, next: any) => {
        if (key === env.getValue('X_API_KEY')) return next();

        return res.status(401).json({ message: 'Acesso não autorizado, API Key Inválida.' });
    };

    private authByJWTToken = async (token: string | undefined, res: any, next: any) => {
        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado, API Key Inválida.' });
        }

        const callback = (err: any, _: any) => {
            if (err) {
                return res.status(403).json({ message: 'Acesso não autorizado, JWT Token Inválido.' });
            }

            return next();
        };

        jwt.verify(token, env.getValue('JWT_PRIVATE_KEY'), callback);
    };
}
